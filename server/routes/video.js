const express = require('express')
const router = express.Router()
const cloudinary = require('../utils/cloudinary')
// DATABASE MODEL
const Video = require('../models/Video')
const { VideoMulter } = require('../utils/multer')


router.post('/', VideoMulter.single('video'), async (req, res) => {
    const { body } = req
    const { file } = req

    // console.log({...body, categories: JSON.parse( body.categories), video: file.filename})
    try {
        const result = await cloudinary.uploader.upload(file.path, { upload_preset: 'video_uploads', resource_type: 'auto' })
        let data = { ...body, categories: JSON.parse(body.categories), video: { cloudinary_id: result.public_id, url: result.secure_url } }
        const video = await Video.create(data)
        res.status(200).json(video)
    } catch (err) {
        res.status(404).send(err)
        console.log(err)
    }

})

router.put('/:id', VideoMulter.single('video'), async (req, res) => {
    const { body, params, file } = req

    if (file) {
        try {
            let user = await Video.findById(params.id)
            await cloudinary.uploader.destroy(user.video.cloudinary_id)

            const result = await cloudinary.uploader.upload(file.path, { upload_preset: 'video_uploads', resource_type: 'auto' })

            let data = { ...body, video: { cloudinary_id: result.public_id, url: result.secure_url }, categories: JSON.parse(body.categories) }

            user = await Video.findByIdAndUpdate(params.id, data, { new: true })

            res.status(200).json(user)
        } catch (err) {
            res.status(404).send(err)
            console.log(err)
        }
    } else {
        try {
            let data = { ...body, categories: JSON.parse(body.categories) }

            let user = await Video.findByIdAndUpdate(params.id, data, { new: true })

            res.status(200).json(user)
        } catch (err) {
            res.status(404).send(err)
            console.log(err)
        }
    }


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
    const { params } = req

    try {
        const video = await Video.findById(params.id)
        res.status(200).json(video)
    } catch (err) {
        res.status(404).send(err)
    }

})

router.delete('/:id', async (req, res) => {
    const { params } = req
    try {
        const video = await Video.findByIdAndDelete(params.id)
        res.status(200).json(video)
    } catch (err) {
        res.status(404).send(err)
    }
})

module.exports = router