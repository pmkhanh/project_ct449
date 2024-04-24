<template>
    <div v-if="employee" class="page col-md-10">
        <h4 class="d-flex justify-content-center" >Hiệu chỉnh thông tin nhân viên</h4>
        <div class="container col-md-8">
            <EmployeeForm :employee="employee" @submit:employee="updateEmployee" @delete:employee="deleteEmployee" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import EmployeeForm from "@/components/StaffComponent/EmployeeForm.vue";
import EmployeeService from "@/services/employee.service";
export default {
    components: {
        EmployeeForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            employee: null,
            message: "",
        };
    },
    methods: {
        async getEmployee(id) {
            try {
                this.employee = await EmployeeService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateEmployee(data) {
            try {
                await EmployeeService.update(this.employee._id, data);
                alert("Thông tin nhân viên được cập nhật thành công!")
                this.$router.push({
                    name: "employee",
                })

            } catch (error) {
                console.log(error);
            }
        },
        async deleteEmployee() {
            if (confirm("Bạn muốn xóa thông tin nhân viên này?")) {
                try {
                    await EmployeeService.delete(this.employee._id);
                    this.$router.push({ name: "employee" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getEmployee(this.id);
        this.message = "";
    },
};
</script>