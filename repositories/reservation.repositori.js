const { reservation, guest } = require('../models');
const { Op } = require('sequelize');

class RservationRepositori {
  // 예약 등록
  createResulve = async (
    startDateTime,
    endDateTime,
    guestId,
    sitterId,
    userId
  ) => {
    const resulveRepositori = await reservation.create({
      startDateTime,
      endDateTime,
      guestId,
      sitterId,
      userId,
    });
    // console.log(userId);
    return resulveRepositori;
  };
  // 중복 예약 로직
  // findResulve = async (startDateTime, endDateTime, guestId, sitterId) => {
  //   const RedundancyReservation = await reservation.findAll({
  //     where: {
  //       guestId, // 예약자 아이디
  //       sitterId, // 시터 아이디
  //       [Op.or]: [
  //         {
  //           startTime: {
  //             [Op.between]: [startDateTime, endDateTime],
  //           },
  //         },
  //         {
  //           endTime: {
  //             [Op.between]: [startDateTime, endDateTime],
  //           },
  //         },
  //         {
  //           [Op.and]: [
  //             { startTime: { [Op.lte]: startDateTime } },
  //             { endTime: { [Op.gte]: endDateTime } },
  //           ],
  //         },
  //       ],
  //     },
  //   });
  //   return RedundancyReservation;
  // };

  // 예약 삭제
  destroyResulve = async (reservationsId, userId) => {
    const a = await reservation.findOne({
      where: { reservationsId },
      include: {
        model: guest,
        as: 'guest',
        where: { UserId: userId },
        attributes: ['guestId'],
      },
    });
    // console.log(a);

    if (!a) {
      return false;
    }
    const reservationRepositori = await reservation.destroy({
      where: { reservationsId, guestId: a.guest.guestId },
    });

    return reservationRepositori;
  };

  // 예약 전체 조회
  getresulve = async () => {
    const reservationRepositori = await reservation.findAll();

    return reservationRepositori;
  };

  // 예약 수정
  putResulve = async (startDateTime, endDateTime, reservationsId, userId) => {
    const findRepositori = await reservation.findAll({});

    const resulveRepositori = await reservation.update(
      {
        startDateTime,
        endDateTime,
        userId,
      },
      {
        where: { reservationsId },
      }
    );

    return resulveRepositori;
  };
}

module.exports = RservationRepositori;
