const { reservation } = require('../models');

class RservationRepositori {
  // 예약 등록
  createResulve = async (startDateTime, endDateTime, guestId, sitterId) => {
    const resulveRepositori = await reservation.create({
      startDateTime,
      endDateTime,
      guestId,
      sitterId,
    });

    return resulveRepositori;
  };
  // 예약 삭제
  destroyResulve = async reservationsId => {
    const reservationRepositori = await reservation.destroy({
      where: { reservationsId },
    });

    return reservationRepositori;
  };

  // 예약 전체 조회
  getresulve = async () => {
    const reservationRepositori = await reservation.findAll();

    return reservationRepositori;
  };
}

module.exports = RservationRepositori;
