const showTimeStorage = require("../../storages/show-time.storage");
const { randomString } = require("../../helpers/random.helper");

async function genQRCode(req, res) {
    const accountNo = "9021944259143";
    const accountName = "NGUYEN TUAN ANH";
    const acqId = "970454";
    const template = "qr_only";
    const addInfo = randomString(16);

    const seatSelected = req.body.seatSelected;
    if (!seatSelected || seatSelected.length === 0) {
        return res.json({ message: "Vui lòng chọn ghế" });
    }

    const amount =
        seatSelected.reduce((amount, seat) => {
            return (amount += seat.price);
        }, 0) * 1000;

    // Call api gen qr code
    const response = await fetch("https://api.vietqr.io/v2/generate", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accountNo,
            accountName,
            acqId,
            template,
            addInfo,
            amount,
        }),
    })
        .then((res) => res.json())
        .then((res) => res.data.qrDataURL);

    // Them vao mang show time
    const userId = req.payload.data.id;
    const showTimeId = req.body.showTimeId;
    const timeId = req.body.timeId;
    const seatIds = seatSelected.map((seat) => seat.seatId);

    const showTime = showTimeStorage.find((showTime) => showTime.id === showTimeId);
    const time = showTime.infos.find((info) => info.id == timeId);
    let bookedSeatId;
    if (time.bookedSeats.length > 0) {
        bookedSeatId = time.bookedSeats[time.bookedSeats.length - 1].id + 1;
    } else {
        bookedSeatId = 1;
    }
    time.bookedSeats.push({
        id: bookedSeatId,
        user_id: userId,
        seats: seatIds,
    });
    const data = [
        {
            content: addInfo,
            showTime,
            qrCodeBase64: response,
        },
    ];
    return res.json({ message: "Thành công", data });
}

module.exports = {
    genQRCode,
};
