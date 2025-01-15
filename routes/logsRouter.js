import express from "express";
import { db } from '../index.js';

const LogsRouter = new express.Router();

// Get all equipment
LogsRouter.get('/', (req, res) => {
    let sql = 'SELECT * FROM logovi;';

    db.query(sql, (err, results) => {
        res.json(results);
    })
})

//jos get single equipment
//delete, update razmisliti na ovoj ruti jer se vecina toga dogada preko procedura u bazi, ali moze npr biti azuriraj stanje na zalihama opreme za sada

export default LogsRouter;