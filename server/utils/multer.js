const multer = require('multer')
const path = require('path')

const ImageMulter = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, (+new Date * Math.random()).toString(36).substring(0, 10))
        }
    }),
    
})

const VideoMulter = multer({
    storage: multer.diskStorage({
        // destination: (req, file, cb) => {
        //     cb(null, './../client/folder/videos')
        // },
        filename: (req, file, cb) => {
            cb(null, (+new Date * Math.random()).toString(36).substring(0, 10))
        }
    })
    
})

module.exports = {ImageMulter, VideoMulter}
