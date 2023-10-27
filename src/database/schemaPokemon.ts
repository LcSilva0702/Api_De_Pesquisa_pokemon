import mongoose from "mongoose";

const Pokemon = new mongoose.Schema ({
    pokemonName: {
        type: String
    },
    moves: {
        type: Array
    },
    height: {
        type: Number
    },
    weigth: {
        type: Number
    }
});

export default mongoose.model("Pokemon", Pokemon);