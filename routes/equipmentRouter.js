import express from "express";
import { db } from '../index.js';

const equipmentRouter = new express.Router();

// Get all equipment
equipmentRouter.get('/', (req, res) => {
    let sql = 'SELECT * FROM oprema;';

    db.query(sql, (err, results) => {
        res.json(results);
    })
})

// Get single equipment
equipmentRouter.get('/:id', async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(404).send({message: 'Oprema nije pronadena' });
    }

    let sql = 'SELECT * FROM oprema WHERE id = ?'

    db.query(sql, [id], (err, results) => {
        if(err) {
            throw err;
        }
        res.json(results);
    })

})

//jos get single equipment
//delete, update razmisliti na ovoj ruti jer se vecina toga dogada preko procedura u bazi, ali moze npr biti azuriraj stanje na zalihama opreme za sada

export default equipmentRouter;