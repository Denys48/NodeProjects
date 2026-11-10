const User = require("../models/userModel");
const RefreshToken = require("../models/refreshTokenModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async(req, res)=>{
    const {email, username, password} = req.body || {};

    if (!email || !username || !password){
        return res.status(400).json({message: "Enter name, email and password"});
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)){
        return res.status(400).json({message: "Enter valid email"});
    }

    const existingUser = await User.findOne({email: email.trim().toLowerCase()});

    if(existingUser){
        return res.status(409).json({message: "User with this email is already exist"});
    }

    if (password.length < 8) {
        return res.status(400).json({message: "Password must have at least 8 symbols"});
    }

    const user = new User({email, username, password, role: "user"});
    await user.save();

    const accessToken = jwt.sign({id: user._id, role: user.role}, config.accessJwtSecret, {expiresIn: config.accessTtl});
    const refreshToken = jwt.sign({id: user._id, role: user.role}, config.refreshJwtSecret, {expiresIn: config.refreshTtl});

    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt: new Date(jwt.decode(refreshToken).exp * 1000)
    });

    res.cookie("refreshToken", refreshToken, {httpOnly: true});
    return res.status(201).json({accessToken, user: {id: user._id, username, email: email.trim().toLowerCase(), role: user.role}});
};

const login = async (req, res) =>{
    const {email, password} = req.body || {};
    if (!email || !password){
        return res.status(400).json({ message: "Enter your email and password"});
    }

    const user = await User.findOne({email: email.trim().toLowerCase()});
    if (!user){
        return res.status(401).json({ message: "Invalid credentials"});
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch){
        return res.status(401).json({ message: "Invalid credentials"});
    }

    const accessToken = jwt.sign({id: user._id, role: user.role}, config.accessJwtSecret, {expiresIn: config.accessTtl});
    const refreshToken = jwt.sign({id: user._id, role: user.role}, config.refreshJwtSecret, {expiresIn: config.refreshTtl});

    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt: new Date(jwt.decode(refreshToken).exp * 1000)
    });

    res.cookie("refreshToken", refreshToken, {httpOnly: true});
    return res.status(200).json({accessToken, user: {id: user._id, username: user.username, email: user.email, role: user.role}});
};

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
};

const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({message: "Refresh token missing"});
    }

    let decoded;

    try {
        decoded = jwt.verify(refreshToken, config.refreshJwtSecret);
    } catch (error) {
        return res.status(401).json({ message: "Wrong token" });
    }

    const storedToken = await RefreshToken.findOneAndDelete({token: refreshToken, user: decoded.id, expiresAt: { $gt: new Date() }});

    if (!storedToken) {
        return res.status(401).json({message: "Invalid or revoked refresh token"});
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({message: "User not found"});
    }

    const accessToken = jwt.sign({id: user._id, role: user.role}, config.accessJwtSecret, {expiresIn: config.accessTtl});
    const newRefreshToken = jwt.sign({id: user._id, role: user.role}, config.refreshJwtSecret, {expiresIn: config.refreshTtl});

    await RefreshToken.create({
        token: newRefreshToken,
        user: user._id,
        expiresAt: new Date(jwt.decode(newRefreshToken).exp * 1000)
    });

    res.cookie("refreshToken", newRefreshToken, {httpOnly: true});
    return res.status(200).json({accessToken});
}

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    await RefreshToken.deleteOne({ token: refreshToken });

    res.clearCookie("refreshToken", {httpOnly: true});
    return res.status(200).json({message: "Logged out successfully"});
};

module.exports = {login, register, getCurrentUser, refresh, logout};