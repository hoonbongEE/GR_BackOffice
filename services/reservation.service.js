const ReservationRepositori = require('../repositories/reservation.repositori.js');
const { reservation } = require('../models');
const moment = require('moment');

class ReservationService {
  ReservationRepositori = new ReservationRepositori();

  // 예약 등록
  createReservation = async (startDateTime, endDateTime, guestId, sitterId) => {
    try {
      const resulveService = await this.ReservationRepositori.createResulve(
        startDateTime,
        endDateTime,
        guestId,
        sitterId
      );

      if (!startDateTime) return { status: 400, message: '예약 시작 날짜를 입력해주세요' };
      else if (!endDateTime) return { status: 400, message: '예약 종료 날짜를 입력해주세요' };
      return { status: 200, message: '예약을 등록하셨습니다.', resulveService };
    } catch (error) {
      return { status: 500, message: '서버 오류' };
    }
  };
  // 예약 삭제
  deleteResulve = async reservationsId => {
    try {
      const reservationService = await this.ReservationRepositori.destroyResulve(reservationsId);

      if (!reservationService) return { status: 400, message: '예정된 예약이 없습니다' };
      return { status: 200, message: '예약을 취소 하셨습니다.', reservationService };
    } catch (error) {
      return { status: 500, message: '서버 오류' };
    }
  };

  // 예약 전체 조회

  getResulve = async () => {
    try {
      const reservationService = await this.ReservationRepositori.getresulve();

      if (!reservationService) return { status: 400, message: '조회할 데이터가 없습니다.' };
      return { status: 200, message: '전체 조회 완료', reservationService };
    } catch (error) {
      return { status: 500, message: '조회 실패 했습니다.' };
    }
  };
}

module.exports = ReservationService;
