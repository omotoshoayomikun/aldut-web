const express = require('express')
const { ImageMulter } = require('../utils/multer')
const cloudinary = require('../utils/cloudinary')
const router = express.Router()
// DATABASE MODELS
const Nude = require('../models/nude')

router.post('/', ImageMulter.array('images'), async (req, res) => {
    const { body, files } = req
console.log(files)
    let Images = []

    files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { upload_preset: 'uploads', resource_type: 'auto' })
            .then(result => Images.push({ cloudinary_id: result.public_id, url: result.secure_url }))
            .catch((err) => {
                console.log(err)
            })
    })

    console.log(Images)


    // if (files) {
    //     try {
    //         files.map(async (file) => {
    //             const result = await cloudinary.uploader.upload(file.path, { upload_preset: 'uploads', resource_type: 'auto' })
    //             return (
    //                 Images.push({ cloudinary_id: result.public_id, url: result.secure_url })
    //             )
    //         })
    //         console.log(Images)
    //     } catch (err) {
    //         return []
    //     }
    // }

    res.status(200).json(files)
    // try {
    //     const nude = await Nude.create(body)
    //     res.status(200).json(nude)
    // } catch (err) {
    //     res.status(404).send(err)
    // }
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
