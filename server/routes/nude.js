const express = require('express')
const { ImageMulter } = require('../utils/multer')
const cloudinary = require('../utils/cloudinary')
const router = express.Router()
// DATABASE MODELS
const Nude = require('../models/nude')

router.post('/', ImageMulter.array('images'), async (req, res) => {
    const { body, files } = req
    // console.log(files)
    let Images = []

    for (let i = 0; i < files.length; i++) {
        try {
            const result = await cloudinary.uploader.upload(files[i].path, { upload_preset: 'uploads', resource_type: 'auto' })
            Images.push({ cloudinary_id: result.public_id, url: result.secure_url })
        } catch (err) {
            console.log(err)
        }
    }
    let data = { ...body, categories: JSON.parse(body.categories), images: Images }
    try {
        const nude = await Nude.create(data)
        res.status(200).json(nude)
    } catch (err) {
        res.status(404).send(err)
        console.log(err)
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

router.delete('/:id', async (req, res) => {
    const { params } = req
    try {
        const nude = await Nude.findByIdAndDelete(params.id)
        res.status(200).json(nude)
    } catch (err) {
        res.status(404).send(err)
    }
})

module.exports = router
