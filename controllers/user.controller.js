const UserSevice = require('../services/user.service.js');

class UserController {
  userService = new UserSevice();
}

module.exports = UserController;
