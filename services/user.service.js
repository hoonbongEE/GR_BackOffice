const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repositori');
const SitterRepository = require('../repositories/sitter.repository');
const GuestRepository = require('../repositories/guest.repository');
const jwt = require('jsonwebtoken');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.sitterRepository = new SitterRepository();
    this.guestRepository = new GuestRepository();
  }

  async createUser(email, password, nickname, address, role, phone) {
    // bcrypt 패스워드 설정
    const hashedPassword = await bcrypt.hash(password, 10);
    // 회원가입
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      nickname,
      address,
      role,
      phone,
    });
    if (role === 'sitter') {
      await this.sitterRepository.create({
        UserId: user.userId,
        career: '1 year',
      });
    } else {
      await this.guestRepository.create({
        UserId: user.userId,
      });
    }
    return user;
  }

  // 로그인
  loginUser = async (email, password) => {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('유효한 이메일이 아닙니다.');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error('유효한 증명이 아닙니다.');
    }
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    return token;
  };

  // 회원정보 수정
  updateUser = async (
    userId,
    email,
    password,
    nickname,
    address,
    role,
    phone
  ) => {
    await this.userRepository.update(userId, {
      email,
      password,
      nickname,
      address,
      role,
      phone,
    });
  };

  // 회원정보 삭제
  deleteUser = async userId => {
    await this.userRepository.delete(userId);
  };
}

module.exports = UserService;
