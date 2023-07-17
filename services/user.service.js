const UserRepositori = require('../repositories/user.repositori.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  userRepositori = new UserRepositori();
}
module.exports = UserService;
