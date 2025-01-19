import express from "express";
import { db } from '../index.js';


const LiRouter = new express.Router();

LiRouter.get("/aktivnost/:id", async(req, res)=>{
    const { id } = req.params;
    let sql = 'CALL AktivnostLicence(?, @status);';

    db.query(sql, [id], (err, results) => {
        res.json(results);
    })
})

export default LiRouter;