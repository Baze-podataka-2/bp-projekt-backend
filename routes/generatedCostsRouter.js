import express from "express";
import { db } from '../index.js';

const costsRouter = new express.Router();

//Get all data from table potrosnja
costsRouter.get('/', (req, res) => {
  let sql = 'SELECT * FROM potrosnja;'
  db.query(sql, (err, results) => {
    res.json(results);
  })
})


//Dohvati generiranu potrošnju u danu do ovog trenutka
costsRouter.get('/trenutno', (req, res) => {
  let sql = `SET @p_temp = CURDATE();
   CALL p_dnevna_potrosnja(@p_temp, @trosakDoSada); 
   SELECT DAY(@p_temp) AS dan, MONTH(@p_temp) AS mjesec, @trosakDoSada AS trosakDoSada FROM DUAL;`
  db.query(sql, (err, results) => {
    if(err) {
      throw err
    }
    const output = results[2][0]
    res.json(output);
  })
})

//Dohvati ukupnu generiranu potrošnju u toku dana
costsRouter.get('/mjeseci', (req, res) => {
  let sql = 'SELECT * FROM ukupna_energetska_potrosnja_po_mjesecima;'
  db.query(sql, (err, results) => {
    if(err) {
      throw err
    }
    res.json(results);
  })
})

//Dohvati ukupnu generiranu potrošnju u toku dana
costsRouter.get('/mjesec', (req, res) => {
  const { mjesec } = req.query;
  let sql = 'SELECT * FROM ukupna_energetska_potrosnja_po_mjesecima WHERE mjesec = ?;'
  db.query(sql, [mjesec], (err, results) => {
    if(err) {
      throw err
    }
    res.json(results);
  })
})


export default costsRouter;
