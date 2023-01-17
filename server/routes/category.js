const express = require('express')
const router = express.Router()

const Category = require('../models/Category')

router.post('/', async (req, res) => {
    const { body } = req
    try {
        const cat = await Category.create(body)
        res.status(200).json(cat)
    } catch (err) {
        res.status(404).send(err)
    }

})

router.get('/', async (req, res) => {
    try {
        const cat = await Category.find()
        res.status(200).json(cat)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.get('/:id', async (req, res) => {
    const { params } = req
    try {
        const cat = await Category.findById(params.id)
        res.status(200).json(cat)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.put('/:id', async (req, res) => {
    const { params, body } = req
    try {
        const cat = await Category.findByIdAndUpdate(params.id,  body, {new: true})
        res.status(200).json(cat)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.delete('/:id', async (req, res) => {
    const { params } = req
    try {
        const cat = await Category.findByIdAndDelete(params.id)
        res.status(200).json(cat)
    } catch (err) {
        res.status(404).send(err)
    }
})

module.exports = router