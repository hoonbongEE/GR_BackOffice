const UserRepositori = require('../repositories/user.repositori.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  // constructor() {
  userRepositori = new UserRepositori();

  createUser = async (email, password, nickname, address, role, phone) => {
    // console.log(email, password, nickname, address, role, phone);
    try {
      const exuser = await this.userRepositori.createUser(
        email,
        password,
        nickname,
        address,
        role,
        phone
      );
      // console.log(exuser);
      return exuser;
    } catch (error) {
      console.log(error);
    }
  };

  // 로그인
  login = async (res, email, password) => {
    // console.log(email, password);
    // 1. 이메일로 사용자 정보 조회
    const userlogin = await this.userRepositori.find(email);
    // console.log(email);

    // 2. 사용자 정보가 없으면 인증 실패
    if (!userlogin || userlogin.length === 0) {
      return res.status(401).json({ errorMessage: '아이디 또는 패스워드를 확인해주세요.' });
    }

    // 3. 비밀번호 비교
    // const isValidPassword = await bcrypt.compare(password, userlogin.password);
    // if (!isValidPassword) {
    //   console.log('2>');
    //   return res
    //     .status(401)
    //     .json({ errorMessage: '아이디 또는 패스워드를 확인해주세요 ' });
    // }

    // 4. 로그인 성공 시 JWT 토큰 생성
    const token = jwt.sign({ userId: userlogin.userId }, process.env.JWT_SECRET, {
      expiresIn: '1h', // 토큰 만료 시간 설정 (1시간)
    });
    res.cookie('authorization', `Bearer ${token}`);
    return userlogin;
  };
}

module.exports = UserService;
