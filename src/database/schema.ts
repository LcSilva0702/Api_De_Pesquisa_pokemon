import mongoose from "mongoose";
import bcrypt from "bcrypt";


const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

User.pre('save', async function (next) {
    try {
        const salts = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(this.password, salts);
        this.password = hashedPassword;

        next()
    } catch (error) {
        console.log(error)
    }
})

export default mongoose.model("User", User);