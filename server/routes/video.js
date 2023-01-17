const express = require('express')
const router = express.Router()
// DATABASE MODEL
const Video = require('../models/Video')


router.post('/', async (req, res) => {
    const { body } = req
    try {
        const video = await Video.create(body)
        res.status(200).json(video)
    } catch (err) {
        res.status(404).send(err)
    }

})

router.post('/:id', async (req, res) => {
    const { body, params } = req
    res.json({body: body, params: params.id})
    // try {
    //     const video = await Video.create(body)
    //     res.status(200).json(video)
    // } catch (err) {
    //     res.status(404).send(err)
    // }

})

router.get('/', async (req, res) => {
    try {
        const video = await Video.find()
        res.status(200).json(video)
    } catch (err) {
        res.status(404).send(err)
    }

})

router.get('/:id', async (req, res) => {
    const { params} = req

    try {
        const video = await Video.findById(params.id)
        res.status(200).json(video)
    } catch (err) {
        res.status(404).send(err)
    }

})

module.exports = router