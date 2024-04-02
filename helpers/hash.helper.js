const bcrypt = require("bcrypt");

async function hashMake(string) {
    return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(string, salt))
        .then((hash) => hash);
}

module.exports = { hashMake };
