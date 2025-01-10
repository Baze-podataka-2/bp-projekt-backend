import express from "express";
import { db } from "../index.js"

const servicesRouter = new express.Router();

servicesRouter.get('/', (req, res) => {
    let sql = 'SELECT * FROM usluge;';

    db.query(sql, (err, results) => {
        res.json(results);
    })
})
export default servicesRouter;