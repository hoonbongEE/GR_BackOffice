const jwt = require('jsonwebtoken');
const verifyToken = (jwt, req, res) => {
  const { authorization } = req.cookies;
  if (!authorization) {
    return res.status(401).json({ message: '인증 정보가 없습니다' });
  }
  const [tokenType, token] = authorization.split(' ');
  if (tokenType !== 'Bearer') {
    return res.status(401).json({ message: '토큰 타입이 일치하지 않습니다.' });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken;
};
const sitterAuthMiddleWare = async (req, res, next) => {
  try {
    const decodedToken = verifyToken(jwt, req, res);
    if (decodedToken.role === '손님') {
      return res.status(401).json({ message: '펫시터 권한이 존재하지 않습니다' });
    }
    const userId = decodedToken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: '비정상적인 요청입니다.',
    });
  }
};
const guestAuthMiddleWare = async (req, res, next) => {
  try {
    const decodedToken = verifyToken(jwt, req, res);
    const userId = decodedToken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: '비정상적인 요청입니다.',
    });
  }
};
const authMiddleWare = async (authorization = null) => {
  if (authorization === '싯터') {
    return sitterAuthMiddleWare;
  } else {
    return guestAuthMiddleWare;
  }
};
authMiddleWare();
module.exports = auth;

// post.('/',authMiddleWare ,(Req,res)=>{
// 포스트 코멘트 = > id값이 생성됨
// 테이블 => 값을 집어넣으면
// 그 id값 서로가  게스가 a 시터b a= > b 예약을 했다
// user 회원가입자체에서 패시터랑 게스트 id 만들면 더 편하지않나
// rol userid 펫시터 상관x?

// })
