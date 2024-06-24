const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    profileImage: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{
        fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }]
})
const User = mongoose.model('User', UserSchema);
module.exports = User