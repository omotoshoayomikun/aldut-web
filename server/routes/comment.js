const express = require('express')
const Comment = require('../models/Comment')

const router = express.Router()

router.get('/:id', async (req, res) => {
    const { params } = req
    try {
        const comments = await Comment.find({videoId: params.id})
        res.status(200).json(comments)
    } catch (err) {
        res.status(404).send(err)
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    const { body } = req
    try {
        const response = await Comment.create(body)
        res.status(200).json(response)
    } catch (err) {
        res.status(404).send(err)
    }
})

module.exports = router