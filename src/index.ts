require('dotenv').config()
import express from "express";
import mongoose from "mongoose"
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json"
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

app.listen(3000, async () => {
    try{
        await mongoose.connect('mongodb://mongo/firstapi');
    }catch(error){
        console.log(error)
    }
    console.log(`Server running in 3000`);
});