import express, { response } from "express";
import { db } from "../index.js"

const servicesRouter = new express.Router();
//Get all services
servicesRouter.get('/', (req, res) => {
    let sql = 'SELECT * FROM usluge;';

    db.query(sql, (err, results) => {
        return res.status(200).json(results);
    })
})

servicesRouter.get('/ukupniprihod', (req, res) => {
    let sql = 'SELECT * FROM UkupniPrihodiUsluge;';

    db.query(sql, (err, results) => {
        return res.status(200).json(results);
    })
})
//Get single service
servicesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).send({ message: "Usluga nije pronašena" })
    }

    const sql = "SELECT * FROM usluge WHERE id_usluga = ?";
    db.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).send({ messsage: err.message })
        }
        return res.status(200).json(results)
    })


})


// To add a new service
servicesRouter.post("/", async (req, res) => {
    const { vrsta, cijena } = req.body;

    if (!vrsta || !cijena) {
        return res.status(400).send({ message: "Potrebno je unesti vrstu i cijenu usluge" })
    }

    const sql = 'INSERT INTO usluge (vrsta, cijena) VALUES (?, ?)';
    db.query(sql, [vrsta, cijena], (err, result) => {
        if (err) {
            console.error("Greška pri unosu u bazu:", err);
            return res.status(500).json({ error: "Greška pri unosu u bazu" });
        }

        res.status(201).json({ message: "Usluga uspješno dodana", id: result.insertId });
    });
})


// Edit a service
servicesRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { vrsta, cijena } = req.body;

    if (!vrsta || !cijena) {
        return res.status(400).send({ message: "Potrebno je unesti vrstu i cijenu usluge" })
    }

    const sql = "UPDATE usluge SET vrsta = ?, cijena = ? WHERE id_usluga = ?";

    db.query(sql, [vrsta, cijena, id], (err, results) => {
        if (err) {
            return res.status(500).send({ message: err.message })
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: "Usluga s tim ID-om nije pronađena" });
        }

        return res.status(200).json({ message: "Usluga je uspjesno ažurirana" })
    })
})


// Removing service
servicesRouter.delete("/:id", async(req, res)=>{
    const { id } = req.params;

    const sql = "DELETE FROM usluge WHERE id_usluga = ?";
    
    db.query(sql, [id], (err, result)=>{

        if(err){
            return res.status(500).send({message: err.message})
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Usluga s tim ID-om nije pronađena" });
        }

        return res.status(201).json({message: "Usluga uspjesno izbrisana"})
    })
})


export default servicesRouter;