const express = require('express');
const router = express.Router();
const main = require('../views/main.js');
const userList = require('../views/userList.js');
const db = require('../models/index.js');
// const {addPage} = require('../views');


router.get('/', async (req, res, next) => {
    try {
        const users = await db.user.findAll();
        res.send(userList(users));
    } catch (err) {
        next(err);
    }
});
router.get('/:userID', async (req, res, next) => {
    try {
        let userID = req.params.userID;
        const thisUser = await db.users.findById(userID);
        res.send(main());
    } catch (err) {
        next(err);
    }
});
router.post('/', async (req, res, next) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        const thisUser = new db.User({
            name: name,
            email: email
        })
        await thisUser.save();
        res.send(main());
    } catch (err) {
        next(err);
    }
});
router.put('/:userID', async (req, res, next) => {
    try {
        let userID = req.params.userID;
        await db.user.updateAttributes({
                name: '',
                email: ''
            })
            .success(function () {});
        res.send(main());
    } catch (error) {
        next(error);
    }
});
router.delete('/:userID', (req, res, next) => {

    try {
        let userID = req.params.userID;
        db.user.destroy({
            where: {

            }
        });
    } catch (error) {
        next(error);
    }
    res.send(main());
});

router.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



module.exports = router;
