require('dotenv').config()
import express from "express";
import mongoose from "mongoose"
import routes from "./routes";
const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, async () => {
    try{
        await mongoose.connect('mongodb://mongo/firstapi');
    }catch(error){
        console.log(error)
    }
    console.log(`Server running in ${process.env.PORT}`);
});