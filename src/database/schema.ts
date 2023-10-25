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
        select: false
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

User.pre('save', async function (next) {
    try {
        const salts = await bcrypt.genSalt(5);
        console.log(salts)
        const hashedPassword = await bcrypt.hash(this.password, salts);
        console.log(this.password, hashedPassword)
        this.password = hashedPassword;
        console.log(hashedPassword);

        next()
    } catch (error) {
        console.log(error)
    }
})

export default mongoose.model("User", User);