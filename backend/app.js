const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
const publishersRouter = require('./app/routers/publisher.route')
const booksRouter = require('./app/routers/book.route')
const employeesRouter = require('./app/routers/employee.route')
const readersRouter = require('./app/routers/reader.route')
const tradesRouter = require('./app/routers/trade.route')


app.use(cors());
app.use(express.json());
app.use("/api/nhaxuatban", publishersRouter);
app.use("/api/sach", booksRouter);
app.use("/api/nhanvien", employeesRouter);
app.use("/api/docgia", readersRouter);
app.use("/api/muonsach", tradesRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." })
});



app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;