const express = require('express');
const router = express.Router();
const main = require('../views/main.js');
const db = require('../models/index.js');
// const {addPage} = require('../views');


router.get('/', async (req, res, next) => {
    try{
        const users = await db.users.findAll();
        res.send(main());
    }
    catch(err){
        next(err);
    }
});
router.get('/:userID', async (req, res) => {
    try{
        let userID = req.params.userID;
        const thisUser = await db.users.findById(userID);
        res.send(main());
    }
    catch(err){
        next(err);
    }
  });
router.post('/', async (req, res) => {
    try{
        let name = req.body.name;
        let email = req.body.email;
        const thisUser = new db.User({
            name: name,
            email: email
        })
        await thisUser.save();
        res.send(main());
    }
    catch(err){
        next(err);
    }
});
router.put('/123', (req, res) => {
    res.send(main());
});
router.delete('/123', (req, res) => {
    res.send(main());
});

// router.get('/add', (req, res) => {
//   res.send(addPage());
// });



module.exports = router;