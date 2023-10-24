import { Router } from "express";
import UserController from "./controller/UserController";

const routes = Router();

routes.get("/users", UserController.find);
routes.post("/user", UserController.create);
routes.delete("/delete", UserController.delete);
routes.put("/updateEmail", UserController.updateEmail)

export default routes