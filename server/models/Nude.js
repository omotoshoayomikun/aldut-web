const mongoose = require('mongoose')

const NudeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    categories: {
        type: [
            {
                category: {
                    type: { title: { type: String, required: true } },
                    required: true
                }
            }
        ],
        required: true
    }
})

const Nude = mongoose.model("nudes", NudeSchema)
module.exports = Nude