const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const filmRouter = require("./routes/film.route");
const authRouter = require("./routes/auth.route");

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(
    cors({
        origin: "*",
    })
);

app.use("/api/film", filmRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
