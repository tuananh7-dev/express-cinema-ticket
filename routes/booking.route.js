const express = require("express");
var router = express.Router();

var showTimeController = require("../controllers/booking/show-time.controller");
var roomController = require("../controllers/booking/room.controller");
var paymentController = require("../controllers/booking/payment.controller");
const middlewareAuthenticateToken = require("../middlewares/auth.middleware");

router.get("/get-show-time-by-film/:id", middlewareAuthenticateToken, showTimeController.getShowTimeByFilmId);
router.get("/get-room-structure/:id", middlewareAuthenticateToken, roomController.getStructureRoomById);
router.post("/gen-qr-code", middlewareAuthenticateToken, paymentController.genQRCode);

module.exports = router;