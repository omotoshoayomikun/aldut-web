const express = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
require('dotenv').config()
const router = express.Router()

router.post('/', (req, res) => {
    const { body } = req
    if (process.env.REACT_APP_USERNAME === body.username && process.env.REACT_APP_PASSWORD === body.password) {
        const claims = { role: 'admin' }
        const accessToken = jwt.sign(claims, process.env.REACT_APP_SECRET, { expiresIn: '1h' })
        res.cookie("jwt", accessToken)
        res.send(accessToken)
        console.log(req.cookies.jwt)
    } else {
        res.status(404).json('Incorrect Credential')
    }

    // res.setHeader("Set-Cookie", cookie.serialize('token', 'admin', {
    //     maxAge: 60 * 60,
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     sameSite: 'strict',
    //     path: '/'
    // }))
    // res.json('Done')
    // console.log(req)

    // const token = req.cookies
    // console.log(token)
    // verify(req.headers.authorization, process.env.REACT_APP_SECRET, function (err, decoded) {
    //     if(err) {
    //         console.log('Not authneticated')
    //     } if(decoded) {
    //         console.log('authneticated')
    //     }
    // });

})

router.get('/', (req, res) => {
    console.log(req.cookies.jwt)
    res.send('Hello world')
})

module.exports = router