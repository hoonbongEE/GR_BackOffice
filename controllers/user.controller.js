const UserService = require('../services/user.service.js');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  signup = async (req, res, next) => {
    const { email, password, nickname, address, role, phone } = req.body;
    // console.log(email);
    const loging = await this.userService.createUser(
      email,
      password,
      nickname,
      address,
      role,
      phone
    );
    res.status(200).json({ loging });
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    const result = await this.userService.login(res, email, password);

    res.status(200).json(email);
  };
}

module.exports = UserController;
