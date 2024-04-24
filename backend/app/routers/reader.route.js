const express = require("express");
const readers = require("../controller/reader.controller");

const router = express.Router();

// nha xuat ban
router.route("/")
    .post(readers.create);
router.route("/")
    .get(readers.findAll);
router.route("/:id")
    .get(readers.findOne);
router.route("/:id")
    .put(readers.update);
router.route("/:id")
    .delete(readers.delete);
router.route("/")
    .delete(readers.deleteAll);

module.exports = router;