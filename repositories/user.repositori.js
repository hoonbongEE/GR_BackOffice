const { User, guest, sitter } = require('../models');

class UserRepositori {
  createUser = async (email, password, nickname, address, role, phone) => {
    // console.log(email);
    const user = await User.create({
      email,
      password,
      nickname,
      address,
      role,
      phone,
    });

    if (!user) {
      return user;
    }
    let newUser;
    if (role === 'sitter') {
      // console.log(role);
      newUser = await sitter.create({
        UserId: user.userId,
        career: '1년',
      });
    } else {
      newUser = await guest.create({
        UserId: user.userId,
      });
    }

    return newUser;
  };

  // 로그인
  find = async email => {
    const findUser = await User.findOne({ where: { email } });
    return findUser;
  };
}

module.exports = UserRepositori;
