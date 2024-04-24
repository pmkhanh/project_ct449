const express = require("express");
const publishers = require("../controller/publisher.controller");

const router = express.Router();

// nha xuat ban
router.route("/")
    .post(publishers.create);
router.route("/")
    .get(publishers.findAll);
router.route("/:id")
    .get(publishers.findOne);
router.route("/:id")
    .put(publishers.update);
router.route("/:id")
    .delete(publishers.delete);
router.route("/")
    .delete(publishers.deleteAll);

module.exports = router;