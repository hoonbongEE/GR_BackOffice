// user.controller.js

const UserService = require('../services/user.service');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // Join the membership
  signup = async (req, res, next) => {
    try {
      // Destructure user data from the request body
      const { email, password, nickname, address, role, phone } = req.body;

      // Call the createUser method from the UserService to create a new user
      const signup = await this.userService.createUser(
        email,
        password,
        nickname,
        address,
        role,
        phone
      );

      console.log('Look here:', signup);

      // Respond with a success message
      res.status(200).json('Your registration has been completed.');
    } catch (error) {
      // If an error occurs during signup, catch it here and respond with an error message
      console.error('Signup error:', error);
      res.status(500).json({ errorMessage: 'Failed to create user.' });
    }
  };

  // Log in
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Call the loginUser method from the UserService to authenticate the user
      const token = await this.userService.loginUser(email, password);

      // Issue a cookie with the JWT token for the client to store
      await res.cookie('authorization', `petsitter ${token}`);

      // Respond with a success message
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      // If an error occurs during login, catch it here and respond with an error message
      console.error('Login Error:', error);
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  };

  // Modify member information using PUT
  updateUser = async (req, res) => {
    try {
      const { email, password, nickname, address, role, phone } = req.body;
      const { userId } = req.params;

      // Call the updateUser method from the UserService to update the user information
      await this.userService.updateUser(
        userId,
        email,
        password,
        nickname,
        address,
        role,
        phone
      );

      // Respond with a success message
      return res
        .status(200)
        .json({ message: 'Member information updated successfully.' });
    } catch (error) {
      // If an error occurs during user update, catch it here and respond with an error message
      console.error('Update Error:', error);
      res
        .status(500)
        .json({ errorMessage: 'Failed to update member information.' });
    }
  };

  // Delete member information using DELETE
  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;

      // Call the deleteUser method from the UserService to delete the user
      await this.userService.deleteUser(userId);

      // Respond with a success message
      return res
        .status(200)
        .json({ message: 'Member information deleted successfully.' });
    } catch (error) {
      // If an error occurs during user deletion, catch it here and respond with an error message
      console.error('Delete Error:', error);
      res
        .status(500)
        .json({ errorMessage: 'Failed to delete member information.' });
    }
  };
}

module.exports = UserController;
