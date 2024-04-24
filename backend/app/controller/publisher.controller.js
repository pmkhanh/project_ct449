const { ClientSession } = require("mongodb");
const ApiError = require("../api-error");
const PublisherService = require("../services/publisher.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.manxb) {
        return next(new ApiError(400, "MaNhaXuatBan cannot be empty"));
    }
    try {
        const publicsherService = new PublisherService(MongoDB.client);
        let document = await publicsherService.create(req.body);
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
        const publicsherService = new PublisherService(MongoDB.client);
        const { tennxb } = req.query;
        if (tennxb) {
            documents = await publicsherService.findByTenNXB(tennxb);
        } else {
            documents = await publicsherService.find({});
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
        const publicsherService = new PublisherService(MongoDB.client);
        const document = await publicsherService.findById(req.params.id);

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
        const publicsherService = new PublisherService(MongoDB.client);
        const document = await publicsherService.update(req.params.id, req.body);
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
        const publicsherService = new PublisherService(MongoDB.client);
        const document = await publicsherService.delete(req.params.id);
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
        const publicsherService = new PublisherService(MongoDB.client);
        const deleteCount = await publicsherService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(
            500, "An error occurred while removing all contacts"
        ));
    }
};
