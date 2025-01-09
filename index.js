import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async(request, response)=>{
    return response.status(200).json({message: "Hello"})
})

app.listen(8080, ()=>{
    console.log("Running on port 8080")
    })