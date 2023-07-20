// user.repository.js

const { User } = require('../models');

class UserRepository {
  async create(user) {
    // Create user in the database and return the result
    return User.create(user);
  }

  async findByEmail(email) {
    // Find the user by email in the database and return the result
    return User.findOne({ where: { email } });
  }

  async update(userId, userData) {
    // Find the user by userId in the database
    const user = await User.findOne({ where: { userId } });

    // Check if the user exists
    if (!user) {
      throw new Error('User not found.');
    }

    // Update the user's information with the provided data
    user.email = userData.email;
    user.password = userData.password; // You may choose to update the password separately with hashing
    user.nickname = userData.nickname;
    user.address = userData.address;
    user.role = userData.role;
    user.phone = userData.phone;

    // Save the updated user data to the database
    await user.save();
  }

  async delete(userId) {
    // Find the user by userId in the database
    const user = await User.findOne({ where: { userId } });

    // Check if the user exists
    if (!user) {
      throw new Error('User not found.');
    }

    // Delete the user from the database
    await user.destroy();
  }
}

module.exports = UserRepository;
