import express from "express";
import cors from "cors";
import 'dotenv/config'
import mySqlDB from 'mysql2';
const PORT = process.env.APP_PORT;

const app = express();
app.use(express.json());
app.use(cors());

const connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const db = mySqlDB.createConnection(connection);

db.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log(`Spojen na bazu: ${connection.database}`)
    }
});

app.get("/", async(request, response)=>{
    return response.status(200).json({message: "Hello"})
})


app.get('/usluge', (req, res) => {
    let sql = 'SELECT * FROM usluge;';

    db.query(sql, (err, results) => {
        res.json(results);
    })
})

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
    })