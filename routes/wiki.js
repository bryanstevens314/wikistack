const express = require('express');
const router = express.Router();
const main = require('../views/main.js');
const addPage = require('../views/addPage.js');

router.get('/', (req, res) => {
  res.send(main());
});
router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
