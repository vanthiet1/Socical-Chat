const User = require('../../model/UserModel');

const searchController = {
    searchAddFriend: async (req, res) => {
        try {
            const { keyword  } = req.query
            if (!keyword) {
                return res.status(400).json({ error: 'keyword parameter is required' });
            }
             const users = await User.find({
                $or:[
                    { name: { $regex: keyword, $options: 'i' } },
                    { email: { $regex: keyword, $options: 'i' } }
                ]
             })
             res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = searchController