const UserRepositori = require('../repositories/user.repositori.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  userRepositori = new UserRepositori();

  createUser = async (email, password, nickname, address, role, phone) => {
    // console.log(email, password, nickname, address, role, phone);
    const exuser = await this.userRepositori.createUser({
      email,
      password,
      nickname,
      address,
      role,
      phone,
    });

    return exuser;
  };
}

module.exports = UserService;
