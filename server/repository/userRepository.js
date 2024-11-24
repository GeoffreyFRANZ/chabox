const User = require('../models/User'); // Import the User model

exports.findsUsers = async (name) => {
    try {
        // Correctly use the User model to perform the find operation
        return await User.find();
    } catch (error) {
        console.error('Error finding users:', error);
        throw error;
    }
};