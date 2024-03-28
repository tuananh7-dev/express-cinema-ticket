const express = require("express");
var router = express.Router();
const getFilmController = require("../controllers/film/get-film.controller");

router.get("/filter-film", getFilmController.filterFilm);
router.get("/filter-film-banner", getFilmController.filterFilmBanner);
router.get("/get-film-by-id/:id", getFilmController.getFilmById);
router.get("/get-random-film-released", getFilmController.getRandomFilmReleased);

module.exports = router;
