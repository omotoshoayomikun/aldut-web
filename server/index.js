const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
// ROUTERS
const video = require('./routes/video')
const nude = require('./routes/nude')
const category = require('./routes/category')
const login = require('./routes/login')
const comment = require('./routes/comment')


app.use(cors())

app.use(express.json())

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://ayomikun:Timileyin_1@nodetuts.zioxi.mongodb.net/adult?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
})

// Routes
app.use('/video', video)
app.use('/nude', nude)
app.use('/category', category)
app.use('/login', login)
app.use('/comment', comment)



app.listen(3001, () => {
    console.log('server is runing on port 3001.... ')
})