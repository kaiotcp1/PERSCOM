const model = require('mongoose');
const app = require('../app');
const Eb = require('../model/ebModel');
const { ebValidate } = require('./validate');

const ebController = {

    createSoldier: async function (req, res) {
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
    },

    getAll: async function (req, res) {
        try {
            const soldierList = await Eb.find();
            res.status(200).json({
                msg: "Every soldiers listed !",
                server: soldierList
            });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    getId: async function (req, res) {
        try {
            const soldier = await Eb.findById(req.params.id);
            res.status(200).json({
                msg: "Soldier Sucessfully search by id",
                server: soldier
            })
        } catch (error) {
            res.status(400).json({ msg: "Soldier not found" });
        }
    },

    updateSoldier: async function (req, res) {
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
    },

    deleteSoldier: async function (req, res) {
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
    },

    register: function(req, res) {
        res.render('tasks/register',{title: 'GOTAI'});
    }

}

module.exports = ebController;