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

// Route that will calls a procedure
clientRouter.get('/', (req, res) => {
    const {id_klijent, id_usluga} = req.query;

    let sql = 'call PromjenaUslugeKlijenta(? ?)';

    db.query(sql, (err, results) => {
        return res.status(200).json(results);
    })
})


export default clientRouter;