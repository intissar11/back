const express = require('express');
const { login, getAuth, register } = require('../controllers/User');
const isAuth = require('../middlewares/auth');
const { registerRules, validator, loginRules } = require('../middlewares/RegisterValidator');
const router=express.Router();



router.post('/register',registerRules(),validator,register)
router.post('/login',loginRules(),validator,login)
router.get('/isAuth',isAuth,getAuth)
module.exports=router