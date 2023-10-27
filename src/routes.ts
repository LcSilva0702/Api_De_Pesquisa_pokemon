import { Router } from "express";
import UserController from "./controller/UserController";
import UserMiddleware from "./midleware/UserMidleware";
import PokemonController from "./controller/PokemonController";

const routes = Router();

routes.post("/user", UserController.create);
routes.post("/login", UserController.login);

routes.use(UserMiddleware.verifyToken);

routes.get("/detailProfile", UserController.detailProfile);
routes.delete("/delete", UserController.delete);
routes.put("/updateProfile", UserController.updateProfile);
routes.get("/pokemon/:name", PokemonController.find)

export default routes