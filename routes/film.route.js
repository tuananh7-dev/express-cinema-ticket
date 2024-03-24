const express = require("express");
var router = express.Router();
const getFilmController = require("../controllers/film/get-film.controller");

router.get("/filter-film", getFilmController.filterFilm);
router.get("/filter-film-banner", getFilmController.filterFilmBanner);

module.exports = router;
