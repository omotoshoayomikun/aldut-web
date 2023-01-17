const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema([

   {
    title: String
   }

    // categories: {
    //     type: [
    //         {
    //             // date: { type: dat, required: true },
    //             title: { type: String, required: true }
    //         },
    //     ],
    //     required: true
    // }
])

const Category = mongoose.model("categories", CategorySchema)
module.exports = Category