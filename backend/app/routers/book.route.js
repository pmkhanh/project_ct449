const express = require("express");
const books = require("../controller/book.controller");

const router = express.Router();

// nha xuat ban
router.route("/")
    .post(books.create);
router.route("/")
    .get(books.findAll);
router.route("/:id")
    .get(books.findOne);
router.route("/:id")
    .put(books.update);
router.route("/:id")
    .delete(books.delete);
router.route("/")
    .delete(books.deleteAll);

module.exports = router;