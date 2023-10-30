import { Request, Response } from "express";
import User from "../database/schemaUser";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

            return response.status(201).json(user);
        } catch (error) {
            return response.status(500).send({
                error: "Registration Failed",
                message: error
            })
        }
    }

    async detailProfile(request: Request, response: Response){
        const id = request.userId;

        try {
            const user: any = await User.findOne({ id });
            
            const userNoPassword = {
                name: user.name,
                email: user.email,
                password: "****"
            }

            return response.status(200).json(userNoPassword);
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            });
        }
    }

    async delete(request: Request, response: Response){
        const id = request.userId;

        try {
            const user = await User.findOne({ id });


            await User.deleteOne({id: id});

            return response.status(204).json("User deleted");
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }

    async updateProfile(request: Request, response: Response){
        const id  = request.userId;
        const { newName, newEmail, newPassword } = request.body;

        try {
            if(newEmail){
                await User.updateOne({id}, { email: newEmail });
            }

            if(newName){
                await User.updateOne({id}, { name: newName});
            }

            if(newPassword){
                await User.updateOne({id}, { password: newPassword });
            }

            return response.status(200).json("Atualizado");
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            });
        }
    }

    async login(request: Request, response: Response){
        const { email, password } = request.body;
        const senhaJWT: any = process.env.JSONPASSWORD
        
        try {
            if(!email || !password){
                return response.status(400).json("Check all fields")
            }

            const user: any = await User.findOne({ email });

            const verificarSenha = await bcrypt.compare(password, user.password);
            
            if(verificarSenha){
                const token: string = await jwt.sign({id: user._id}, senhaJWT, {expiresIn: "360h"}); 

                return response.status(201).json({
                    token
                });

            } else {
                return response.status(401).json("email ou senha incorreto")
            }
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }
}

export default new UserController;