const { ClientSession } = require("mongodb");
const ApiError = require("../api-error");
const ReaderService = require("../services/reader.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.madocgia && !req.body?.ten && !req.body?.dienthoai) {
        return next(new ApiError(400, "MaDocGia, Ten, DienThoai cannot be empty"));
    }
    try {
        const readerService = new ReaderService(MongoDB.client);
        let document = await readerService.create(req.body);
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
        const readerService = new ReaderService(MongoDB.client);
        const { ten } = req.query;
        if (ten) {
            documents = await readerService.findByTen(ten);
        } else {
            documents = await readerService.find({});
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
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.findById(req.params.id);

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
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.update(req.params.id, req.body);
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
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.delete(req.params.id);
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
        const readerService = new ReaderService(MongoDB.client);
        const deleteCount = await readerService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(
            500, "An error occurred while removing all contacts"
        ));
    }
};
