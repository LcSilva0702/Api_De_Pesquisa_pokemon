import { Request, Response } from "express";
import User from "../database/schema";

class UserController {
    async create(request: Request, response: Response){
        const { name, email, password } = request.body;

        try {
            const userExists = await User.findOne({ email });

            if(userExists){
                return response.status(400).json({
                    error: "Xiiiiiiiiiii",
                    message: "User already exists"
                })
            }


            const user = await User.create({
                name,
                email,
                password
            });

            return response.json(user);
        } catch (error) {
            return response.status(500).send({
                error: "Registro Falhou",
                message: error
            })
        }
    }

    async find(request: Request, response: Response){
        try {
            const users = await User.find();
            

            return response.status(200).json({users})
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }

    async delete(request: Request, response: Response){
        const { email } = request.body;

        try {
            const user = await User.findOne({ email });

            if(!email){
                return response.status(400).json("Insira o email");
            }

            if(!user){
                return response.status(400).json("Usuario não existe");
            }

            await User.deleteOne({email: user.email});

            return response.status(204).json("Usuario deletado");
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }


    async updateEmail(request: Request, response: Response){
        const { email, novoEmail } = request.body

        try {
            const user = await User.findOne({ email });

            if(!user){
                return response.status(404).json("Usuario não existe");
            }

            await User.updateOne({email}, { email: novoEmail})

            const user2 = await User.findOne({ novoEmail });
            
            return response.status(200).json({user2})
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }
}

export default new UserController;