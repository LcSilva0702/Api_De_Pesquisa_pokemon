import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../database/schema";

const senhaJWT: any = process.env.JSONPASSWORD;

interface TokenPayload {
    email: string,
    iat: number,
    exp: number
}

class UserMiddleware {
    async verifyToken(request: Request, response: Response, next: NextFunction){
        const { authorization } = request.headers;

        if(!authorization){
            return response.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
        }

        const token = authorization.split(" ")[1];

        try {
            const user = await jwt.verify(token, senhaJWT);

            const {email} = user as TokenPayload

            request.userEmail = email;

            return next();
        } catch (error) {
            
        }
    }
}

export default new UserMiddleware;