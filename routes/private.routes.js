const express = require('express')
const router = express.Router()

router.get("/autho",require ("../contoller/private.controller").autho)
module.exports = router;