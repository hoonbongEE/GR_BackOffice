// user.service.js

const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');
const SitterRepository = require('../repositories/sitter.repository');
const GuestRepository = require('../repositories/guest.repository');
const jwt = require('jsonwebtoken');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.sitterRepository = new SitterRepository();
    this.guestRepository = new GuestRepository();
  }

  async createUser(email, password, nickname, address, role, phone) {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the create method from the UserRepository to create a new user in the database
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      nickname,
      address,
      role,
      phone,
    });

    // Create additional data based on the role
    if (role === 'sitter') {
      await this.sitterRepository.create({
        UserId: user.userId,
        career: '1 year',
      });
    } else {
      await this.guestRepository.create({
        UserId: user.userId,
      });
    }

    return user;
  }

  loginUser = async (email, password) => {
    // Call the findByEmail method from the UserRepository to find the user by email
    const user = await this.userRepository.findByEmail(email);

    // Check if the user exists
    if (!user) {
      throw new Error('Invalid credentials.');
    }

    // Use bcrypt to securely compare the provided password with the user's hashed password
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error('Invalid credentials.');
    }

    // If passwords match, create a JWT token for the user
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h', // Set token expiration time (1 hour)
      }
    );

    // Return the JWT token
    return token;
  };

  // Modify member information using PUT
  updateUser = async (
    userId,
    email,
    password,
    nickname,
    address,
    role,
    phone
  ) => {
    // Call the update method from the UserRepository to update the user information in the database
    await this.userRepository.update(userId, {
      email,
      password,
      nickname,
      address,
      role,
      phone,
    });
  };

  // Delete member information using DELETE
  deleteUser = async userId => {
    // Call the delete method from the UserRepository to delete the user from the database
    await this.userRepository.delete(userId);
  };
}

module.exports = UserService;
