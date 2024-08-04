const router = require('express').Router()
const friendController = require('../controllers/Friend/friendController');

router.post('/users/unfriends' ,friendController.unFriendRequest);


module.exports = router;
