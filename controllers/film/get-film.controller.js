const { randomInt } = require("../../helpers/random.helper");
const filmStorage = require("../../storages/film.storage");

async function filterFilm(req, res) {
    const limit = req.query.limit || 20;
    const isReleased = req.query.isReleased || 0;

    const filterFilms = filmStorage.filter(
        function (film) {
            if (this.count < limit && film.isReleased == isReleased) {
                this.count++;
                return true;
            }
            return false;
        },
        { count: 0 }
    );
    res.send({ data: filterFilms });
}

async function filterFilmBanner(req, res) {
    const filterFilms = filmStorage.filter(function (film) {
        if (film.showBanner == 1 && film.banner) {
            return true;
        }
        return false;
    });

    res.send({ data: [filterFilms[randomInt(0, filterFilms.length - 1)]] });
}

module.exports = {
    filterFilm,
    filterFilmBanner,
};
