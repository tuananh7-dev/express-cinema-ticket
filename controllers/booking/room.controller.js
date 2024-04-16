const rooms = require("../../storages/room.storage");

function getStructureRoomById(req, res) {
    const roomId = req.params.id;
    const room = rooms.find((room) => room.id == roomId);
    if (!room) {
        return res.status(412).json({ message: "Phòng không tồn tại" });
    }
    return res.json({ message: "Thành công", data: [room] });
}

module.exports = {
    getStructureRoomById,
};
