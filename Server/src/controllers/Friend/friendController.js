const User = require('../../model/UserModel');

const FriendController = {
    unFriendRequest: async (req, res) => {
        const { fromUserId, toUserId } = req.body;
        try {
            const recipient = await User.findById(toUserId);
            if (!recipient) {
                return res.status(404).send({ message: 'Không tìm thấy người dùng' });
            }

            const sender = await User.findById(fromUserId);

            if (!sender) {
                return res.status(404).send({ message: 'Người gửi yêu cầu không tồn tại' });
            }

            const recipientIndex = recipient.friends.findIndex(friend => friend.equals(fromUserId));
            const senderIndex = sender.friends.findIndex(friend => friend.equals(toUserId));

            if (recipientIndex === -1 || senderIndex === -1) {
                return res.status(404).send({ message: 'Yêu cầu hủy kết bạn không tồn tại' });
            }

            recipient.friends.splice(recipientIndex, 1);
            sender.friends.splice(senderIndex, 1);

            await recipient.save();
            await sender.save();

            res.status(200).send({ message: 'Hủy Kết Bạn Thành Công' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
}

module.exports = FriendController;
