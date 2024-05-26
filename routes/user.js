const {Router} = require('express')
const router = Router()

const {
    userRegisterIndexHandler,
    userLoginIndexHandler,
    userLoginStoreHandler,
    userRegisterStoreHandler,
} = require('../controllers/user')

router.get('/login', userLoginIndexHandler);
router.post('/login', userLoginStoreHandler);

router.get('/register', userRegisterIndexHandler);
router.post('/register', userRegisterStoreHandler);

module.exports = router;