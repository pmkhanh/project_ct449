const { ObjectId } = require("mongodb");
const { options } = require("../routers/book.route");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("sach");
    };
    extractBookData(payload) {
        const book = {
            masach: payload.masach,
            tensach: payload.tensach,
            dongia: payload.dongia,
            soquyen: payload.soquyen,
            namxuatban: payload.namxuatban,
            manxb: payload.manxb,
            tacgia: payload.tacgia,
        };

        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    async create(payload) {
        const book = this.extractBookData(payload);
        const result = await this.Book.findOneAndUpdate(
            book,
            {
                $set: book
            },
            {
                returnDocument: "after", upsert: true
            }
        );

        return result.value;
    }
    async find(filter) {
        const cursor = await this.Book.find(filter)
        return await cursor.toArray();
    }

    async findByTenBook(ten) {
        return await this.find({
            tensach: { $regex: new RegExp(ten), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        };

        const update = this.extractBookData(payload);
        const result = await this.Book.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"},
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });

        return result.value;
    }

    async deleteAll(){
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookService;