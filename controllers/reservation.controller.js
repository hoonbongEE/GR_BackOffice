const ReservationService = require('../services/reservation.service.js');
// const moment = require('moment');

class ReservationController {
  constructor() {
    this.reservationService = new ReservationService();
  }

  // 예약 등록
  resulve = async (req, res, next) => {
    const { startDateTime, endDateTime } = req.body;

    const { guestId, sitterId } = req.params;
    const { status, message, resulveService } =
      await this.reservationService.createReservation(
        startDateTime,
        endDateTime,
        guestId,
        sitterId
      );

    res.status(status).json({ message });
  };

  // 예약 삭제git remote add origin ".git"
  deleteresulve = async (req, res, next) => {
    const { reservationsId } = req.params;

    const { status, message, reservationService } =
      await this.reservationService.deleteResulve(reservationsId);

    res.status(status).json({ message });
  };

  // 예약 전체 조회
  getresulve = async (req, res, next) => {
    const { status, messge, reservationService } =
      await this.reservationService.getResulve();

    res.status(status).json({ messge, reservationService });
  };
}

module.exports = ReservationController;
