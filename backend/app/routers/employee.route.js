const express = require("express");
const employees = require("../controller/employee.controller");

const router = express.Router();

// nha xuat ban
router.route("/")
    .post(employees.create);
router.route("/")
    .get(employees.findAll);
router.route("/:id")
    .get(employees.findOne);
router.route("/:id")
    .put(employees.update);
router.route("/:id")
    .delete(employees.delete);
router.route("/")
    .delete(employees.deleteAll);
router.route("/login")
    .post(employees.login);
module.exports = router;