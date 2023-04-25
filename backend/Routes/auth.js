const { RegisterUser, LoginUser } = require('../Controllers/auth')

const router=require('express').Router()

router.post('/register',RegisterUser)
router.post('/login',LoginUser)

module.exports=router