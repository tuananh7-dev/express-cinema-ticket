const filmStorages = require("../../storages/film.storage");
const showTimeStorages = require("../../storages/show-time.storage");

function getShowTimeByFilmId(req, res) {
    const filmId = req.params.id;
    const film = filmStorages.find((film) => film.id == filmId);
    if (!film) {
        return res.status(412).json({ message: "Phim không tồn tại trên hệ thống" });
    }
    // const showTime = showTimeStorages.filter(
    //     (showTime) => showTime.filmId == filmId && new Date(showTime.date).getTime() >= Date.now()
    // );
    showTime = showTimeStorages;
    const data = [
        {
            film,
            showTime,
        },
    ];
    return res.json({ message: "Thành công", data });
}

module.exports = {
    getShowTimeByFilmId,
};
