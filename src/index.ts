require('dotenv').config()
import express from "express";
import mongoose from "mongoose"
import routes from "./routes";
const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, async () => {
    try{
        await mongoose.connect('mongodb://mongo/firstapi');
    }catch(error){
        console.log(error)
    }
    console.log(`Server running in 3000`);
});