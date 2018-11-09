const express = require('express');
const router = express.Router();
const main = require('./views/main.js');

router.get('/', (req, res) => {
  res.send(main());
});

module.exports = router;
