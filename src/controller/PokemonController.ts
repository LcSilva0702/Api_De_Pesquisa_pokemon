import Pokemon from "../database/schemaPokemon"
import { Request, Response } from "express"
import connectionPokeApi from "../connectionAxios/connectionAxios";

class PokemonController {
    async find(request: Request, response: Response){
        const { name } = request.params
        const verifyPokemonInDb = await Pokemon.findOne({ name: name });
        const nameLower = name.toLocaleLowerCase()

        try {
            if(!name){
                return response.status(400).json("Enter the name of the pokemon you want")
            }
                
            if(!verifyPokemonInDb){
                const pokemon: any = await connectionPokeApi.get(`/pokemon/${nameLower}`);
                    
                const pokemonApi = await Pokemon.create({
                    name: pokemon.data.name,
                    moves: pokemon.data.moves
                });
                    
                return response.status(200).json(pokemonApi);
            }

            return response.status(200).json(verifyPokemonInDb);
        } catch (error) {
            return response.status(500).send({
                error: "Registration Failed",
                message: error
            })
        }
    }
}

export default new PokemonController