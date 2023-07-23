const ReservationRepositori = require('../repositories/reservation.repositori.js');

class ReservationService {
  ReservationRepositori = new ReservationRepositori();

  // 예약 등록
  createReservation = async (
    startDateTime,
    endDateTime,
    guestId,
    sitterId,
    userId
  ) => {
    try {
      const resulveService = await this.ReservationRepositori.createResulve(
        startDateTime,
        endDateTime,
        guestId,
        sitterId,
        userId
      );
      // const RedundancyReservation = await tihs.ReservationRepositori.findResulve(
      //   startDateTime,
      //   endDateTime,
      //   guestId,
      //   sitterId
      // );
      // if (!RedundancyReservation) return { status: 400, message: '중복된 예약입니다.!' };
      if (!startDateTime)
        return { status: 400, message: '예약 시작 날짜를 입력해주세요!' };
      else if (startDateTime === endDateTime)
        return {
          status: 400,
          message: '예약 시작 날짜와 종료 날짜가 같으면 안됩니다!',
        };
      else if (!endDateTime)
        return { status: 400, message: '예약 종료 날짜를 입력해주세요!' };
      else if (!sitterId)
        return { status: 400, message: '펫시터를 선택 해주세요!' };
      return { status: 200, message: '예약을 등록하셨습니다.', resulveService };
    } catch (error) {
      return { status: 500, message: '서버 오류' };
    }
  };
  // 예약 삭제
  deleteResulve = async (reservationsId, userId) => {
    try {
      const reservationService =
        await this.ReservationRepositori.destroyResulve(reservationsId, userId);
      // console.log(userId);
      if (!reservationService)
        return { status: 400, message: '예정된 예약이 없습니다!' };
      return { status: 200, message: '예약을 취소 하셨습니다!' };
    } catch (error) {
      console.log(error);
      return { status: 500, message: '서버 오류' };
    }
  };

  // 예약 전체 조회

  getResulve = async () => {
    try {
      const reservationService = await this.ReservationRepositori.getresulve();

      if (!reservationService)
        return { status: 400, message: '조회할 데이터가 없습니다!' };
      return {
        status: 200,
        message: '전체 예약 조회 완료',
        reservationService,
      };
    } catch (error) {
      return { status: 500, message: '조회를 실패 했습니다.' };
    }
  };

  // 예약 수정
  putReservation = async (
    startDateTime,
    endDateTime,
    reservationsId,
    userId
  ) => {
    try {
      const resulveService = await this.ReservationRepositori.putResulve(
        startDateTime,
        endDateTime,
        reservationsId,
        userId
      );

      if (startDateTime === endDateTime)
        return {
          status: 400,
          message: '예약 시작 날짜와 종료 날짜가 같으면 안됩니다.',
        };
      else if (!startDateTime)
        return { status: 400, message: ' 예약 시작 날짜를 선택 해주세요.' };
      else if (!userId)
        return { status: 400, message: ' 예약된 손님이 없습니다.' };
      else if (!endDateTime)
        return { status: 400, message: ' 예약 종료 날짜를 선택 해주세요.' };
      else if (!reservationsId)
        return { status: 400, message: '예약된 날짜가 없습니다.' };

      return {
        status: 200,
        message: '예약된 날짜를 수정 했습니다.',
        resulveService,
      };
    } catch (error) {
      return { status: 500, message: ' 서버 오류' };
    }
  };
}

module.exports = ReservationService;
