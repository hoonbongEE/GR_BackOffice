const { guest } = require('../models');

class GuestRepository {
  async create(data) {
    return guest.create(data);
  }
}

module.exports = GuestRepository;
