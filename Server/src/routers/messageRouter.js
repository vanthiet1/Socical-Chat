const router = require('express').Router()
const messageController = require('../controllers/message/messageController');

router.get('/message/:fromUserId/:toUserId' ,messageController.getMessageUser);
router.delete('/message/:id' ,messageController.deletetMessageUser);


module.exports = router;
