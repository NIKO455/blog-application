const {Router} = require('express')
const {indexHandler} = require("../controllers");
const router = Router()


router.get('/', indexHandler)

module.exports = router