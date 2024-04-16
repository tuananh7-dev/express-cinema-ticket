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
    const data = [
        {
            content: addInfo,
            qrCodeBase64: response,
        },
    ];
    return res.json({ message: "Thành công", data });
}

module.exports = {
    genQRCode,
};
