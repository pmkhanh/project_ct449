const { ClientSession } = require("mongodb");
const ApiError = require("../api-error");
const EmployeeService = require("../services/employee.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.msnv && !req.body?.password && !req.body?.sdt) {
        return next(new ApiError(400, "MSNV, Password and SDT cannot be empty"));
    }
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        let document = await employeeService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the NXB")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const { hotennv } = req.query;
        if (hotennv) {
            documents = await employeeService.findByTenBook(hotennv);
        } else {
            documents = await employeeService.find({});
        }

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving NXB")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "NXB not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.id}`,
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.update(req.params.id, req.body);
        if (document != null) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, `Error updating contact with id=${req.params.id}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.delete(req.params.id);
        if (document != null) {
            return next(new ApiError(
                404, "Contact not found"
            ));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const deleteCount = await employeeService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(
            500, "An error occurred while removing all contacts"
        ));
    }
};

exports.login = async (req, res, next) => {
    if(!req.body?.data?.msnv || !req.body?.data?.password){
        return next(new ApiError(400, "Thông tin đăng nhập còn trống"))
    }
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.login(req.body.data);
        if(!document){
            return (next(new ApiError(404, "Tài khoản không tồn tại")))
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(error.message));
    }
};