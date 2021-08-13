const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username:  String,
    firstName:  String,
    lastName: String,
    password: String,
    roles: [
        String
    ],
    more: Schema.Types.Mixed
});

function createUsersModel() {
    const User = mongoose.model('User', userSchema);
    return User;
}

module.exports = {
    createUsersModel
}
