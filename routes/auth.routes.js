const express = require('express')
const router = express.Router()
router.post("/login",require ("../contoller/auth.controller").login )
router.post("/register",require ("../contoller/auth.controller").register)


module.exports = router;