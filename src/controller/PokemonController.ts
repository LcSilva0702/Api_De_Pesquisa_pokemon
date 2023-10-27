import Pokemon from "../database/schemaUser"
import { Request, Response } from "express"
import connectionPokeApi from "../connectionAxios/connectionAxios";

class PokemonController {
    async find(request: Request, response: Response){
        const { name } = request.params
        const verifyPokemonInDb = await Pokemon.findOne({ name });

        if(!verifyPokemonInDb){
            const pokemon: any = await connectionPokeApi.get(`/pokemon/${name}`);

            const pokemonFormat = {
                name: pokemon.data.name,
                moves: pokemon.data.moves,
                height: pokemon.data.height,
                weigth: pokemon.data.weigth
            }

            await Pokemon.create({pokemonFormat});

            return response.status(200).json(pokemonFormat);
        }

        return response.status(200).json(verifyPokemonInDb);
    }
}

export default new PokemonController