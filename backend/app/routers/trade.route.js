const express = require("express");
const trades = require("../controller/trade.controller");

const router = express.Router();

// nha xuat ban
router.route("/")
    .post(trades.create);
router.route("/")
    .get(trades.findAll);
router.route("/:id")
    .get(trades.findOne);
router.route("/:id")
    .put(trades.update);
router.route("/:id")
    .delete(trades.delete);
router.route("/")
    .delete(trades.deleteAll);

module.exports = router;