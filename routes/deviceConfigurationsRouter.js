import express from "express";
import { db } from "../index.js";

const configurationRouter = new express.Router();

//dohvati sve konfiguracije
configurationRouter.get('/', (req, res) => {
  let sql = 'SELECT * FROM konfiguracija_uredjaja;';

  db.query(sql, (err, results) => {
    res.json(results);
  })
})

//kreiraj konfiguraciju*
configurationRouter.post('/kreiraj-konfiguraciju', (req, res) => {
  const { graficka_kartica = null, procesor = null, SSD = null, ram = null, IP_adresa = null, dimenzije = null, PDU = null, patchpanel = null, rack_rails = null, UPS = null, hladenje = null, preklopnik = null, router = null } = req.body;

  if(graficka_kartica !== null && UPS === null) { //radi se o posluzitelju
    let sql = 'INSERT INTO konfiguracija_uredjaja (graficka_kartica, procesor, SSD, ram, IP_adresa) VALUES (?, ?, ?, ?, ?)'
    db.query(sql, [graficka_kartica, procesor, SSD, ram, IP_adresa], (err, results) => {
      if(err) {
        throw err;
      }
      return res.status(200).send("Konfiguracija uspjesno kreirana")
    })
  } else if (UPS != null && graficka_kartica == null) { //radi se o racku
    let sql = 'INSERT INTO konfiguracija_uredjaja (dimenzije, PDU, patchpanel, rack_rails, UPS, hladenje, switch, router) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [dimenzije, PDU, patchpanel, rack_rails, UPS, hladenje, preklopnik, router], (err, results) => {
      if(err) {
        throw err;
      }
      return res.status(200).send("Konfiguracija uspjesno kreirana")
    });
  }
})



export default configurationRouter;


