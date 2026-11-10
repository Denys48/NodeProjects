const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    if (!authHeader){
        return res.status(401).json({ message: "Token not provided" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
        return res.status(401).json({ message: "Wrong token format" });
    }

    const token = parts[1];

    jwt.verify(token, config.accessJwtSecret, (err, decoded) =>{
        if(err){
            return res.status(401).json({ message: "Wrong token" });
        }
        req.user = decoded;
        next();
    });
};