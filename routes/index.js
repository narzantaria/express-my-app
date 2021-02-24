const express = require('express');
const router = express.Router();

const heroes = require('./heroes');

router.use('/heroes', heroes);

router.get('/', (req, res) => {
  console.log(__dirname);
  res.render("main");
});

router.get('/addhero', (req, res) => {
  res.render("addhero");
});

module.exports = router;