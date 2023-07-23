const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middleware.js');

const ReservationController = require('../controllers/reservation.controller');
const reservationController = new ReservationController();

router.post(
  '/reservation/:guestId/:sitterId',
  middlewares,
  reservationController.resulve
);
router.delete(
  '/reservation/:reservationsId',
  middlewares,
  reservationController.deleteresulve
);
router.get('/reservation', middlewares, reservationController.getresulve);
router.put(
  '/reservation/:reservationsId',
  middlewares,
  reservationController.putresulve
);

module.exports = router;
