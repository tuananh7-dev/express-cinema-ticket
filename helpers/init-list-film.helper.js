const { randomDesc, randomListFullname, randomInt } = require("../../helpers/random.helper");

const netfilxFilms = require("../../storages/netflix.storage");
const videoIds = require("../../storages/video-id.storage");

function initFilmStorage() {
    const results = [];

    netfilxFilms.forEach((film, index) => {
        // Generate desc
        const desc = randomDesc();

        // Generate director
        const directors = randomListFullname(randomInt(1, 2));

        // Generate actors
        const actors = randomListFullname(randomInt(0, 12));

        // Generate video id
        let videoId = "";
        if (index < videoIds.length) {
            videoId = videoIds[index];
        } else {
            videoId = videoIds[randomInt(0, videoIds.length - 1)];
        }
        results.push({
            id: film.videoId,
            name: film.title,
            thumbnail: film.boxart.url,
            trailer: "https://www.youtube.com/watch?v=" + videoId,
            releasedAt: [2024, 2023, 2022, 2021, 2020][randomInt(0, 4)],
            during: randomInt(80, 150),
            directors,
            actors,
            desc,
            isReleased: randomInt(0, 3) === 0 ? 0 : 1,
        });
    });
    return results;
}

module.exports = initFilmStorage;
