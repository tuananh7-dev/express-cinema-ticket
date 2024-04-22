const accountStorage = require("../../storages/account.storage");

function getMyTicker(req, res) {
    const userId = req.payload.data.id;
    const user = accountStorage.find((user) => user.id == userId);
    return res.json({ message: "Thành công", data: user.tickets });
}

module.exports = {
    getMyTicker,
};
