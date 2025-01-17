import express from "express";
import { db } from '../index.js';

const inRouter = new express.Router();

// To get all incidents
inRouter.get('/', (req, res) => {
    let sql = 'SELECT * FROM incidenti;';

    db.query(sql, (err, results) => {
        res.json(results);
    })
})

// To add a new incident
inRouter.post("/", async (req, res) => {
    const { datum, opis, status} = req.body;

    if (!datum || !opis || !status) {
        return res.status(400).send({ message: "Potrebno je unjeti datum opis i status" })
    }

    const sql = 'INSERT INTO incidenti (datum, opis, status) VALUES (?, ?, ?)';
    db.query(sql, [datum, opis, status], (err, result) => {
        if (err) {
            console.error("Greška pri unosu u bazu:", err);
            return res.status(500).json({ error: "Greška pri unosu u bazu" });
        }

        res.status(201).json({ message: "Incident uspješno dodan", id: result.insertId });
    });
})


// Edit a incident
inRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { datum, opis, status} = req.body;

    if (!datum || !opis || !status) {
        return res.status(400).send({ message: "Potrebno je unjeti datum opis is status" })
    }

    const sql = "UPDATE  Incidenti SET datum = ?, opis = ?, status = ? WHERE id_incidenta = ?";

    db.query(sql, [datum, opis, status, id], (err, results) => {
        if (err) {
            return res.status(500).send({ message: err.message })
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: "Incident s tim ID-om nije pronađen" });
        }

        return res.status(200).json({ message: "Incident je uspjesno ažuriran" })
    })
})


// To remove a incident
inRouter.delete("/:id", async(req, res)=>{
    const { id } = req.params;

    const sql = "DELETE FROM Incidenti WHERE id_incidenta = ?";
    
    db.query(sql, [id], (err, result)=>{

        if(err){
            return res.status(500).send({message: err.message})
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Incident s tim ID-om nije pronađen" });
        }

        return res.status(201).json({message: "Incident uspjesno izbrisan"})
    })
})


export default inRouter;