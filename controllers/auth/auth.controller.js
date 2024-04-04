const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const accounts = require("../../storages/account.storage");
const hashHelper = require("../../helpers/hash.helper");

const secretKey = "436A2E2D328D3373F12C88CF82F24";

async function register(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Kiem tra tai khoan da ton tai chua
    const isAccountExist = accounts.find((account) => account.username === username);
    if (isAccountExist) {
        return res.status(412).json({ message: "Tài khoản đã tồn tại trên hệ thống" });
    }

    // Hash password
    const hashPassword = await hashHelper.hashMake(password);

    // Luu vao storage
    const account = {
        id: accounts[accounts.length - 1].id + 1,
        username,
        password: hashPassword,
    };
    accounts.push(account);

    // Tao token dang nhap
    const token = jwt.sign(
        {
            data: {
                id: account.id,
                username: account.username,
            },
        },
        secretKey,
        { expiresIn: "1h" }
    );
    // Tra KQ
    const result = {
        account,
        token,
    };
    return res.json({ message: "Tạo tài khoản thành công", data: result });
}

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Kiem tra tai khoan co ton tai khong
    const account = accounts.find((account) => account.username === username);
    if (!account) {
        return res.status(412).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
    }

    // Kiem tra password
    const compare = await bcrypt.compare(password, account.password);
    if (!compare) {
        return res.status(412).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
    }

    // Tao token dang nhap
    const token = jwt.sign(
        {
            data: {
                id: account.id,
                username: account.username,
            },
        },
        secretKey,
        { expiresIn: "1h" }
    );
    // Tra KQ
    const result = {
        account,
        token,
    };
    return res.json({ message: "Đăng nhập thành công", data: result });
}

function getMe(req, res) {
    const userId = req.payload.data.id;
    const account = accounts.find((account) => account.id == userId);
    const data = { ...account };
    delete data.password;
    return res.json({ message: "Đăng nhập thành công", data });
}

module.exports = {
    register,
    login,
    secretKey,
    getMe,
};
