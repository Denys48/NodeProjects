const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    username: {type: String, required: true, trim: true},
    password: {type: String, required: true},
    role: {type: String}
});

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
