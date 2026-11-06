const User = require('../models/userModel');

const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

const createUser = async (req, res) => {
    const { name, email, age, city } = req.body;
    const newUser = new User({ name, email, age, city, isActive: true });
    await newUser.save();
    res.status(201).json(newUser);
};

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
};

const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
};

const deleteUser = async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };