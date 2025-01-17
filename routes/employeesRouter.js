import express, { response } from "express";
import { db } from "../index.js";

const employeesRouter = new express.Router();

//Get all employees
employeesRouter.get('/broj-zadataka', (req, res) => {
  let sql = 'SELECT * FROM broj_zadataka_po_zaposleniku;'
  db.query(sql, (err, response) => {
    res.json(response);
  })
})

//Dohvati zaposlenika sa najmanje zadataka
employeesRouter.get('/najmanje-zadataka', (req, res) => {
  let sql = 'CALL VratiZaposlenika(@id, @ime, @prezime, @broj); SELECT @id AS id, @ime AS ime, @prezime AS prezime, @broj AS broj FROM DUAL;'
  db.query(sql, (err, results) => {
    const output = results[1][0];
    res.json(output)
  })
})

//Dodaj zadatak zaposleniku koji ima najmanje zadataka
employeesRouter.post('/kreiraj', (req, res) => {
  const { datum, poruka, posluzitelj, zaposlenik } = req.body;
  let sql = 'INSERT INTO Odrzavanje (datum, opis, id_posluzitelj, id_zaposlenik) VALUES (?, ?, ?, ?)';
  db.query(sql, [datum, poruka, posluzitelj, zaposlenik], (err, results) => {
    if (err) {
      throw err
    }
    return res.status(200).send('Zadatak uspješno dodan');
  });
});


export default employeesRouter;
