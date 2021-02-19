const express = require('express');
const mysql = require('mysql');
const { db } = require('../config/db');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let con = mysql.createConnection(db);
    con.connect(function (err) {
      if (err) throw err;
    });
    let SQL_TABLE = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = \"heroes\"";
    con.query(SQL_TABLE, function (err, result) {
      if (err) throw err;
      if (result.length <= 0) {
        let SQL_CREATE_TABLE = `CREATE TABLE heroes (
          _id BIGINT(20) NOT NULL AUTO_INCREMENT, 
          name VARCHAR(255) NOT NULL,
          race VARCHAR(255) NOT NULL,
          date DATETIME NOT NULL,
          PRIMARY KEY (_id)
        )`;
        con.query(SQL_CREATE_TABLE, function (err, result) {
          if (err) throw err;
        });
      }
      let SQL_INSERT = `INSERT INTO heroes (name, race, date) VALUES (\"${req.body.name}\", \"${req.body.race}\", \"${new Date(req.body.date).toISOString().slice(0, 19).replace('T', ' ')}\")`;
      con.query(SQL_INSERT, function (err, result) {
        if (err) throw err;
        con.end();
        res.send("Data inserted");
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/', (req, res) => {
  let con = mysql.createConnection(db);
  con.connect(function (err) {
    if (err) throw err;
  });
  let sql = "SELECT * FROM heroes";
  con.query(sql, function (err, data, fields) {
    if (err) {
      console.error(err);
      res.status(500).render("heroes", { data: [{ "name": 'Server Error' }] });
    }
    con.end();
    res.render("heroes", { data: data });
  });
});

router.patch('/:id', (req, res) => {
  let con = mysql.createConnection(db);
  con.connect(function (err) {
    if (err) throw err;
  });
  let params = '';
  if (req.body.name) {
    params = params + (!params.length ? '' : ', ') + `name = \'${req.body.name}\'`;
  }
  if (req.body.race) {
    params = params + (!params.length ? '' : ', ') + `race = \'${req.body.race}\'`;
  }
  if (req.body.date) {
    params = params + (!params.length ? '' : ', ') + `date = \'${new Date(req.body.date).toISOString().slice(0, 19).replace('T', ' ')}\'`;
  }
  if (params.length > 0) {
    let SQL_UPDATE = `UPDATE heroes SET ${params} WHERE _id = ${req.params.id}`;
    con.query(SQL_UPDATE, function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
      con.end();
      res.json(data);
    });
  } else {
    con.end();
    res.json({});
  }
});

module.exports = router;