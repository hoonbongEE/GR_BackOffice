const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const reservationRouter = require('./reservation.routes');

router.use('/users', userRouter); // 유저
router.use('/', reservationRouter); // 예약

module.exports = router;
