const { sitter } = require('../models');

class SitterRepository {
  async create(data) {
    return sitter.create(data);
  }
}

module.exports = SitterRepository;
