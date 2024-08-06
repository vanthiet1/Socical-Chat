const router = require('express').Router()
const getUsers = require('../controllers/clerkController');
const UserController = require('../controllers/User/userController')
// const requireAuth = require('../middleware/authMiddleware')
router.get('/users',getUsers);
router.get('/users/all',UserController.getAllUser);
router.get('/users/:googleId' ,UserController.getAnUser);
router.get('/users/room/:id',UserController.getAnUserById);

router.post('/users/google' ,UserController.addUserLoginGoogle);

router.post('/users/sendFriendRequest', UserController.sendFriendRequest);
router.post('/users/acceptFriendRequest', UserController.acceptFriendRequest);
router.post('/users/cancelFriendRequest', UserController.cancelFriendRequest);



module.exports = router;
