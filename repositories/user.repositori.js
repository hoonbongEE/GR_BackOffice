const { User } = require('../models');

class UserRepositori {
  createUser = async (email, password, nickname, address, role, phone) => {
    // console.log(email);
    const findUser = await User.create(
      email,
      password,
      nickname,
      address,
      role,
      phone
    );

    return findUser;
  };
}

module.exports = UserRepositori;
