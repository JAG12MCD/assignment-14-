const User = require('../models/User');  // Assuming you have a User model

const loginUser = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
        return user;
    }
    return null;
};

const registerUser = async (username, password) => {
    const user = await User.create({ username, password});
    return user;
};

module.exports = { loginUser, registerUser };
