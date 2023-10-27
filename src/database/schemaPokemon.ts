import mongoose from "mongoose";

const Pokemon = new mongoose.Schema ({
    name: {
        type: String
    },
    moves: {
        type: Array
    }
});

export default mongoose.model("Pokemon", Pokemon);