const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const filmRouter = require("./routes/film.route");

app.use(
    cors({
        origin: "*",
    })
);

app.use("/api/film", filmRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
