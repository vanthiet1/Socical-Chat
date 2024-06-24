const User = require('../../model/UserModel');
const {getIo} = require('../../socket/socketManager')
const UserController = {
    getAnUser: async (req,res)=>{
        try {
            const {googleId} = req.params
            const user = await User.findOne({ googleId }).populate('friendRequests.fromUserId', 'name email')
            if (!user) {
                return res.status(400).json("Người dùng không tồn tại")
              }
              res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message: error.message}); 
        }
    },
    addUserLoginGoogle: async (req, res) => {
        try {
            const { googleId, name, email, profileImage } = req.body;
            let user = await User.findOne({ googleId })
            if (!user) {
                user = new User({ googleId, name, email, profileImage });
                await user.save();
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    sendFriendRequest: async (req, res) => {
        const { fromUserId, toUserId } = req.body;
        try {
            const io = getIo();
            const recipient = await User.findById(toUserId);
            if (!recipient) {
                return res.status(404).send({ message: 'Không có người dùng đó' });
            }
            if (recipient.friendRequests.some(request => request.fromUserId.equals(fromUserId))) {
                return res.status(400).send({ message: 'Yêu cầu kết bạn đã được gửi đi rồi' });
            }
           if( fromUserId === toUserId){
             return res.status(400).json({message:"Không thể gửi lời mời kết bạn cho chính mình"})
           }

            recipient.friendRequests.push({ fromUserId });
            await recipient.save();

            io.to(toUserId).emit('friendRequestReceived', fromUserId );
            res.status(200).send({ message: 'Lời mời kết bạn đã được gửi' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    acceptFriendRequest: async (req, res) => {
        const { fromUserId, toUserId } = req.body;
        try {
            const recipient = await User.findById(toUserId);
            if (!recipient) {
                return res.status(404).send({ message: 'Không có người dùng đó' });
            }

            const requestIndex = recipient.friendRequests.findIndex(request => request.fromUserId.equals(fromUserId));
            if (requestIndex === -1) {
                return res.status(404).send({ message: 'Yêu cầu kết bạn không tìm thấy' });
            }

            recipient.friendRequests.splice(requestIndex, 1);
            recipient.friends.push(fromUserId);

            const sender = await User.findById(fromUserId);
            sender.friends.push(toUserId);

            await recipient.save();
            await sender.save();

            res.status(200).send({ message: 'Friend request accepted successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}
module.exports = UserController;