const express = require('express');
const router = express.Router();

const heroes = require('./heroes');

router.use('/heroes', heroes);

router.get('/', (req, res) => {
  // res.send("Shutruk-Nahhunte!!!");
  res.render("main");
  // res.sendFile(path.join(__dirname + '/dist/index.html'));
});

module.exports = router;