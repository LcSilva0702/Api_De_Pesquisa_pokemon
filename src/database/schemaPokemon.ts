import mongoose from "mongoose";

const Pokemon = new mongoose.Schema ({
    name: {
        type: String
    },
    types: {
        type: Array
    }
});

export default mongoose.model("Pokemon", Pokemon);