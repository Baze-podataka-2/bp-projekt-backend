import express from "express";
import { db } from "../index.js"

const serversRouter = new express.Router();

// Get all servers
serversRouter.get('/', (req, res) => {
    let sql = 'SELECT * FROM posluzitelj;';

    db.query(sql, (err, results) => {
        res.json(results);
    })
})




// Get number of incidents and logs for each server
serversRouter.get("/statistika", async(req, res)=>{
    const sql = "SELECT * FROM ukupanBrojLiI";
    db.query(sql, (err, results) => {
        res.json(results);
    })

})


//Get single server
serversRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).send({ message: "Poslužitelj nije pronađen" })
    }

    const sql = "SELECT * FROM Posluzitelj WHERE id_posluzitelj = ?";
    db.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).send({ messsage: err.message })
        }
        return res.status(200).json(results)
    })


})



// To add a new server
serversRouter.post("/", async (req, res) => {
    const { naziv, kategorija } = req.body;

    if (!naziv || !kategorija) {
        return res.status(400).send({ message: "Potrebno je unesti naziv i kategoriju posluzitelja" })
    }

    const sql = 'INSERT INTO Posluzitelj (naziv, kategorija) VALUES (?, ?)';
    db.query(sql, [naziv, kategorija], (err, result) => {
        if (err) {
            console.error("Greška pri unosu u bazu:", err);
            return res.status(500).json({ error: "Greška pri unosu u bazu" });
        }

        res.status(201).json({ message: "Poslužitelj uspješno dodan", id: result.insertId });
    });
})


// Edit a server
serversRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { naziv, kategorija } = req.body;

    if (!naziv || !kategorija) {
        return res.status(400).send({ message: "Potrebno je unesti naziv i kategoriju posluzitelja" })
    }

    const sql = "UPDATE Posluzitelj SET naziv = ?, kategorija = ? WHERE id_posluzitelj = ?";

    db.query(sql, [naziv, kategorija, id], (err, results) => {
        if (err) {
            return res.status(500).send({ message: err.message })
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: "Posluzitelj s tim ID-om nije pronađen" });
        }

        return res.status(200).json({ message: "Posluzitelj je uspjesno ažuriran" })
    })
})


// Removing server
serversRouter.delete("/:id", async(req, res)=>{
    const { id } = req.params;

    const sql = "DELETE FROM Posluzitelj WHERE id_posluzitelj = ?";
    
    db.query(sql, [id], (err, result)=>{

        if(err){
            return res.status(500).send({message: err.message})
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Posluzitelj s tim ID-om nije pronađen" });
        }

        return res.status(200).json({message: "Posluzitelj uspjesno izbrisan"})
    })
})

export default serversRouter;