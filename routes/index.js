const express = require('express');
const router = express.Router();

const heroes = require('./heroes');

router.use('/heroes', heroes);

router.get('/', (req, res) => {
  res.render("main");
});

module.exports = router;