const { ObjectId } = require("mongodb");
const { options } = require("../routers/publisher.route");

class PublicsherService {
    constructor(client) {
        this.Publicsher = client.db().collection("nhaxuatban");
    };
    extractPublicsherData(payload) {
        const publisher = {
            manxb: payload.manxb,
            tennxb: payload.tennxb,
            diachi: payload.diachi,
        };

        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );
        return publisher;
    }

    async create(payload) {
        const publisher = this.extractPublicsherData(payload);
        const result = await this.Publicsher.findOneAndUpdate(
            publisher,
            {
                $set: publisher
            },
            {
                returnDocument: "after", upsert: true
            }
        );

        return result.value;
    }
    async find(filter) {
        const cursor = await this.Publicsher.find(filter)
        return await cursor.toArray();
    }

    async findByTenNXB(tennxb) {
        return await this.find({
            tennxb: { $regex: new RegExp(tennxb), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Publicsher.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractPublicsherData(payload);
        const result = await this.Publicsher.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" },
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Publicsher.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.Publicsher.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = PublicsherService;