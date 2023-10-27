import Pokemon from "../database/schemaPokemon"
import { Request, Response } from "express"
import connectionPokeApi from "../connectionAxios/connectionAxios";

class PokemonController {
    async find(request: Request, response: Response){
        const { name } = request.params
        const verifyPokemonInDb = await Pokemon.findOne({ name: name });
    

        if(!name){
            return response.status(400).json("Enter the name of the pokemon you want")
        }
        
        if(!verifyPokemonInDb){
            const pokemon: any = await connectionPokeApi.get(`/pokemon/${name}`);
            
            const pokemonApi = await Pokemon.create({
                name: pokemon.data.name,
                moves: pokemon.data.moves
            });
            
            return response.status(200).json(pokemonApi);
        }

        return response.status(200).json(verifyPokemonInDb);
    }
}

export default new PokemonController