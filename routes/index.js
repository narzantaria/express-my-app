const express = require('express');
const router = express.Router();

const heroes = require('./heroes');

router.use('/heroes', heroes);

router.get('/', (req, res) => {
  res.render("main");
});

router.get('/addhero', (req, res) => {
  res.render("addhero");
});

module.exports = router;