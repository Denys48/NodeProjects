require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI, 
    port: process.env.PORT, 
    accessJwtSecret: process.env.ACCESS_JWT_SECRET,
    accessTtl: process.env.ACCESS_TTL,
    refreshJwtSecret: process.env.REFRESH_JWT_SECRET,
    refreshTtl: process.env.REFRESH_TTL
};