const express = require('express');
const router = express.Router();
const main = require('../views/main');
const db = require('../models');
const {
  addPage
} = require('../views');


router.get('/', async (req, res) => {
  const pages = await db.page.findAll();
  console.log(pages);
  res.send(main(pages));
});
router.get('/page/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const pages = await db.page.findOne({
      where: {
        slug: slug
      }
    });

    console.log('FIRED>>>>>>>>>>>>', pages);
    res.send(main([pages]));
  } catch (error) {
    next(error);
  }
});
router.get('/:pageTitle/edit', async (req, res) => {
  const pageTitle = req.params.pageTitle;

  const pages = await db.page.findAll();
  console.log(pages);
  res.send(main(pages));
});
router.post('/', async (req, res, next) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    console.log('FIRED>>>>>>>>>>>', status);
    const p1 = title.toLowerCase().split(' ').join('-');
    const slug = `${p1}`;

    const thispost = new db.page({
      title: title,
      slug: slug,
      content: content,
      status: status
    })
    await thispost.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});
router.get('/add', (req, res) => {
  res.send(addPage());
});
router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


module.exports = router;
