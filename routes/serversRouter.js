import express from "express";
import { db } from "../index.js"

const serversRouter = new express.Router();

serversRouter.get('/', (req, res) => {
    let sql = 'SELECT * FROM posluzitelj;';

    db.query(sql, (err, results) => {
        res.json(results);
    })
})

export default serversRouter;