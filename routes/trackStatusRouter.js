import express from "express";
import { db } from "../index.js";

const statusRouter = new express.Router();


//get all statuses posluzitelj
statusRouter.get('/posluzitelj', (req, res) => {

  let sql = 'SELECT * FROM pracenje_statusa_posluzitelja;';

  db.query(sql, (err, results) => {
    if(err) {
      throw err;
    }
    res.json(results)
  })
})


//get all statuses rack
statusRouter.get('/rack', (req, res) => {

  let sql = 'SELECT * FROM pracenje_statusa_racka;';

  db.query(sql, (err, results) => {
    if(err) {
      throw err;
    }
    res.json(results)
  })
})


//Insert status for device posluzitelj
statusRouter.post('/dodaj/posluzitelj', (req, res) => {
  const { id_posluzitelj, procesor_status, ram_status, ssd_status, temperatura_status } = req.body;
  let sql = 'INSERT INTO pracenje_statusa_posluzitelja (id_posluzitelj, procesor_status, ram_status, ssd_status, temperatura_status) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [id_posluzitelj, procesor_status, ram_status, ssd_status, temperatura_status], (err, results) => {
    if(err) {
      throw err
    }
    return res.status(200).send("Status uspješno dodan")
  })
})
//Insert status for device posluzitelj
statusRouter.post('/dodaj/rack', (req, res) => {
  const { id_rack, temperatura_status, popunjenost_status, pdu_status, ups_status, bandwith_status_switch, interface_status_router } = req.body;
  if(bandwith_status_switch === undefined) {
    let sql = 'INSERT INTO pracenje_statusa_racka (id_rack, temperatura_status, popunjenost_status, pdu_status, ups_status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [id_rack, temperatura_status, popunjenost_status, pdu_status, ups_status], (err, results) => {
      if(err) {
        throw err
      }
      return res.status(200).send("Status uspješno dodan")
    })
  }
  else if(bandwith_status_switch !== undefined) {
    let sql = 'INSERT INTO pracenje_statusa_racka (id_rack, temperatura_status, popunjenost_status, pdu_status, ups_status, bandwith_status_switch, interface_status_router) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [id_rack, temperatura_status, popunjenost_status, pdu_status, ups_status, bandwith_status_switch, interface_status_router], (err, results) => {
      if(err) {
        throw err
      }
      return res.status(200).send("Status uspješno dodan")
    })
  }
})



export default statusRouter;