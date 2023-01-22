const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    video: {
        type: {
            cloudinary_id: { type: String, required: true },
            url: { type: String, required: true },
        },
        required: true,
    },
    clip: {
        type: String,
        // required: true,
    },
    categories: {
        type: [
            {
                _id: { type: String, required: true },
                title: { type: String, required: true }
            }
        ],
        required: true
    }
})

const Video = mongoose.model("Video", VideoSchema)
module.exports = Video