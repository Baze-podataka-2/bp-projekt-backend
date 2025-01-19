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

clientRouter.get('/azuriraj', (req, res) => {
    const { id_klijent, id_usluga } = req.query;

    if (!id_klijent || !id_usluga) {
        return res.status(400).json({ error: 'id_klijent i id_usluga su obavezni parametri.' });
    }

    // SQL query s procedurom i izlaznim parametrom
    let sql = `
        CALL PromjenaUslugeKlijenta(?, ?, @poruka);
        SELECT @poruka AS poruka;
    `;

    db.query(sql, [id_klijent, id_usluga], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Dogodila se greška pri izvršavanju procedure.' });
        }

        // Povlačenje izlaznog parametra @poruka
        const message = results[1][0].poruka;

        return res.status(200).json({ message });
    });
});


clientRouter.get("/brojdana/:id", async(req, res)=>{
    const { id } = req.params;
    let sql = 'SELECT BrojDanaR(?) as recenica;';

    db.query(sql, [id], (err, results) => {
        return res.status(200).json(results);
    })
})

clientRouter.get('/dugovanje', (req,res) => {
    const { id_klijent } = req.query;

    let sql = 'CALL ProvjeraDuznikaR(?, @poruka); SELECT @poruka AS poruka;'

    db.query(sql, [id_klijent], (err, response) => {
        const output = response[1][0];
        res.json(output);
    })
})

clientRouter.get('/aktivni', (req, res) => {
    let sql = 'SELECT * FROM AktivniKlijenti;'
    db.query(sql, (err, response) => {
        res.json(response);
    })
})



export default clientRouter;