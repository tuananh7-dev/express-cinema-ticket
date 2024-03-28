const { randomInt } = require("../../helpers/random.helper");
const filmStorage = require("../../storages/film.storage");

function filterFilm(req, res) {
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

function filterFilmBanner(req, res) {
    const filterFilms = filmStorage.filter(function (film) {
        if (film.showBanner == 1 && film.banner) {
            return true;
        }
        return false;
    });

    res.send({ data: [filterFilms[randomInt(0, filterFilms.length - 1)]] });
}

function getFilmById(req, res) {
    const id = req.params.id;
    const film = filmStorage.find((film) => film.id == id);
    res.send({ data: [film] });
}

function getRandomFilmReleased(req, res) {
    const limit = req.query.limit || 4;
    let result = [];
    let countRandomFail = 0;
    for (let i = 0; i < limit; i++) {
        let film = filmStorage[randomInt(0, filmStorage.length - 1)];
        if ((film.isReleased === 0 || result.find((item) => item.id === film.id)) && countRandomFail < 100) {
            countRandomFail++;
            i--;
        } else {
            result.push(film);
        }
    }
    res.send({ data: result });
}

module.exports = {
    filterFilm,
    filterFilmBanner,
    getFilmById,
    getRandomFilmReleased,
};
