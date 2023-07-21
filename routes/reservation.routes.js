const express = require('express');
const router = express.Router();
// const middlewares = require('../middlewares/middleware.js');

const ReservationController = require('../controllers/reservation.controller');
const reservationController = new ReservationController();

router.post('/reservation/:guestId/:sitterId', reservationController.resulve);
router.delete('/reservation/:reservationsId', reservationController.deleteresulve);
router.get('/reservation', reservationController.getresulve);

module.exports = router;
