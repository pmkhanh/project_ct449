const { ObjectId } = require("mongodb");
const { options } = require("../routers/reader.route");

class TradeService {
    constructor(client) {
        this.Trade = client.db().collection("theodoimuonsach");
    };
    extractTradeData(payload) {
        const trade = {
            madocgia: payload.madocgia,
            masach: payload.masach,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
            msnv: payload.msnv,
        };

        Object.keys(trade).forEach(
            (key) => trade[key] === undefined && delete trade[key]
        );
        return trade;
    }

    async create(payload) {
        const trade = this.extractTradeData(payload);
        const result = await this.Trade.findOneAndUpdate(
            trade,
            {
                $set: trade
            },
            {
                returnDocument: "after", upsert: true
            }
        );

        return result.value;
    }
    async find(filter) {
        const cursor = await this.Trade.find(filter)
        return await cursor.toArray();
    }

    async findByMaDocGia(ma) {
        return await this.find({
            madocgia: { $regex: new RegExp(ma), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Trade.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        };

        const update = this.extractTradeData(payload);
        const result = await this.Trade.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"},
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Trade.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });

        return result.value;
    }

    async deleteAll(){
        const result = await this.Trade.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = TradeService;