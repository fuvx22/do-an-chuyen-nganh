const { StatusCodes } = require('http-status-codes');
var express = require('express');
const { userRouter } = require('./userRoute')
const { courseRouter } = require('./courseRoute')
const { majorRouter } = require('./majorRoute')

const router =  express.Router()

router.get('/', (req, res) => {
  res.status(StatusCodes.UNAUTHORIZED).json({message: "Test message"})
})

router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({message: "APIs v1 are ready to use"})
})

router.use('/user', userRouter)
router.use('/course', courseRouter)
router.use('/major', majorRouter)

module.exports = router