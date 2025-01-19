import express from "express";
import { db } from '../index.js';


const LiRouter = new express.Router();

LiRouter.get("/aktivnost/:id", async(req, res)=>{
    const { id } = req.params;

    let sql = 'CALL AktivnostLicence(?, @poruka); SELECT @poruka AS poruka';


    db.query(sql, [id], (err, results) => {
        const poruka = results[1][0].poruka;
        return res.json({ poruka });
    })
})

export default LiRouter;