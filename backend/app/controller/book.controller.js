const { ClientSession } = require("mongodb");
const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.masach) {
        // console.log("ma sach", req.body?.masach)
        return next(new ApiError(400, "MaSach cannot be empty"));
    }
    try {
        const bookService = new BookService(MongoDB.client);
        let document = await bookService.create(req.body);
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
        const bookService = new BookService(MongoDB.client);
        const { tensach } = req.query;
        if (tensach) {
            documents = await bookService.findByTenBook(tensach);
        } else {
            documents = await bookService.find({});
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
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);

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
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
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
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
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
        const bookService = new BookService(MongoDB.client);
        const deleteCount = await bookService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(
            500, "An error occurred while removing all contacts"
        ));
    }
};
