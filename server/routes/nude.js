const express = require('express')
const router = express.Router()
// DATABASE MODELS
const Nude = require('../models/nude')

router.post('/', async (req, res) => {
    const { body } = req
    try {
        const nude = await Nude.create(body)
        res.status(200).json(nude)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const nude = await Nude.find()
        res.status(200).json(nude)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.get('/:id', async (req, res) => {
    const { params } = req
    try {
        const nude = await Nude.findById(params.id)
        res.status(200).json(nude)
    } catch (err) {
        res.status(404).send(err)
    }

})

module.exports = router
