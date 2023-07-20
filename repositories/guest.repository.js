// guest.repository.js

const { guest } = require('../models');

class GuestRepository {
  async create(data) {
    // Create guest data in the database and return the result
    return guest.create(data);
  }

  // You can add more methods to the GuestRepository if needed for guest-related operations.
}

module.exports = GuestRepository;
