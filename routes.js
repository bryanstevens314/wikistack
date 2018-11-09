const express = require('express');
const router = express.Router();
const main = require('./views/main.js');
const addPage = require('./views/addPage.js');

router.get('/', (req, res) => {
  res.redirect('/wiki');
});
router.get('/wiki', (req, res) => {
  res.send(main());
});
router.get('/wiki/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
