const { ObjectId } = require("mongodb");
const { options } = require("../routers/employee.route");

class EmployeeService {
    constructor(client) {
        this.Employee = client.db().collection("nhanvien");
    };
    extractemployeeData(payload) {
        const employee = {
            msnv: payload.msnv,
            hotennv: payload.hotennv,
            password: payload.password,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            sdt: payload.sdt,
        };

        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );
        return employee;
    }

    async create(payload) {
        const employee = this.extractemployeeData(payload);
        const result = await this.Employee.findOneAndUpdate(
            employee,
            {
                $set: employee
            },
            {
                returnDocument: "after", upsert: true
            }
        );

        return result.value;
    }
    async find(filter) {
        const cursor = await this.Employee.find(filter)
        return await cursor.toArray();
    }

    async findByHoTenNV(hoten) {
        return await this.find({
            hotennv: { $regex: new RegExp(hoten), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Employee.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractemployeeData(payload);
        const result = await this.Employee.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" },
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Employee.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.Employee.deleteMany({});
        return result.deletedCount;
    }

    async login(payload) {
        const filter = {
            msnv: payload.msnv,
            password: payload.password,
        };
        return await this.Employee.findOne(filter);
    }
}

module.exports = EmployeeService;