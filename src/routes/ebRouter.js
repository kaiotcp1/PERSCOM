const model = require('mongoose');
const app = require('../app');
const Eb = require('../model/ebModel');
const express = require('express');
const router = express.Router();
const { ebValidate } = require('./validate');
const { db } = require('../model/ebModel');


router.post('/gotai/register', async (req, res) => {
    const { error } = ebValidate(req.body);
    if (error) { return res.status(400).send(error.message) }

    const selectMan = await Eb.findOne({ name: req.body.name });
    if (selectMan) return res.status(400).json({ msg: "Soldier already exists !" })

    const soldier = new Eb({
        name: req.body.name,
        patent: req.body.patent,
        squad: req.body.squad,
        weapon: req.body.weapon,
        status: req.body.status,
        steam: req.body.steam,
    });

    console.log(soldier);

    try {
        const savedSoldier = await soldier.save()
        res.status(200).send(savedSoldier);
    } catch (error) {
        res.status(400).json({ error });
    }
});


router.get('/', async (req, res) => {
    res.render('tasks/register', { title: 'Register' });
});




router.get('/home', async (req, res) => {
    const soldierList = await Eb.find()
        .lean()
        .then(soldierList => res.render('tasks/home', { soldierList, title: 'Gotai'  }));
});



router.get('/list', async (req, res) => {
    try {
        const soldierList = await Eb.find();
        res.status(200).json({
            msg: "Every soldiers listed !",
            server: soldierList
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});



router.get('/list/:id', async (req, res) => {
    try {
        const soldier = await Eb.findById(req.params.id);
        res.status(200).json({
            msg: "Soldier Sucessfully search by id",
            server: soldier
        })
    } catch (error) {
        res.status(400).json({ msg: "Soldier not found" });
    }
});



router.put('/update/:id', async (req, res) => {
    try {
        const soldier = await Eb.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            msg: "Successfully updated Data !!"
        })

    } catch (error) {
        res.status(400).json({
            msg: "Failed to update data"
        })
    }
});



router.delete('/delete/:id', async (req, res) => {
    const soldier = await Eb.findById(req.params.id)
    console.log(soldier)
    if (!soldier) {
        res.status(404).json({
            msg: "Soldier not Found !"
        })
    }
    await soldier.remove()
    res.status(200).json({
        msg: "Successfully removed soldier !"
    })
});

module.exports = router;