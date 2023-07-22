const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const reservationRouter = require('./reservation.routes');

router.use('/', userRouter, reservationRouter); // 라우터 통일

module.exports = router;
