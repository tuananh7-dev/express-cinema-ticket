const desc = require("../storages/desc.storage");
const fullnames = require("../storages/fullname.storage");

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDesc(input = "") {
    if (input.length > 500) {
        return input;
    }
    const index = randomInt(0, desc.length - 1);
    let result = input + desc[index];
    return randomDesc(result);
}

function randomListFullname(qty) {
    let result = [];
    for (let i = 0; i < qty; i++) {
        const index = randomInt(0, fullnames.length - 1);
        result.push(fullnames[index]);
    }
    return result;
}

module.exports = {
    randomInt,
    randomDesc,
    randomListFullname,
};
