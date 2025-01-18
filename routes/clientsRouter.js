import express, { response } from "express";
import { db } from "../index.js"

const clientRouter = new express.Router();

//Get all clients
clientRouter.get('/', (req, res) => {
    let sql = 'SELECT * FROM  klijenti_usluge_krediti';

    db.query(sql, (err, results) => {
        return res.status(200).json(results);
    })
})


export default clientRouter;