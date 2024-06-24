const router = require('express').Router()
const searchController = require('../controllers/Search/searchController');

// const requireAuth = require('../middleware/authMiddleware')
router.get('/users/search/friends' ,searchController.searchAddFriend);


module.exports = router;
