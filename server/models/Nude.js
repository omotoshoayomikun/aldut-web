const mongoose = require('mongoose')

const NudeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    images: {
        type: [
            {
                cloudinary_id: {type: String, required: true},
                url: {type: String, required: true}
            }
        ],
        required: true,
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

const Nude = mongoose.model("nudes", NudeSchema)
module.exports = Nude