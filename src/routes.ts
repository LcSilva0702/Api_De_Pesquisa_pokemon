import { Router } from "express";
import UserController from "./controller/UserController";
import UserMiddleware from "./midleware/UserMidleware";

const routes = Router();

routes.post("/user", UserController.create);
routes.post("/login", UserController.login);

routes.use(UserMiddleware.verifyToken);

routes.get("/users", UserController.find);
routes.delete("/delete", UserController.delete);
routes.put("/updateEmail", UserController.updateEmail);

export default routes