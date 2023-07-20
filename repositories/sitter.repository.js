// sitter.repository.js

const { sitter } = require('../models');

class SitterRepository {
  async create(data) {
    // Create sitter data in the database and return the result
    return sitter.create(data);
  }

  // You can add more methods to the SitterRepository if needed for sitter-related operations.
}

module.exports = SitterRepository;
