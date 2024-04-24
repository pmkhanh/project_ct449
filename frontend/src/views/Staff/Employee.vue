<template>
    <div class="container page column">

        <div class="d-flex p-3 justify-content-center">
            <div class="me-3">
                <h4>
                    Nhân viên
                    <i class="fa-regular fa-address-card"></i>
                </h4>
            </div>
            <div class="col-md-9">
                <InputSearch v-model="searchText" />
            </div>
        </div>
        <div class="page column">
            <div class="my-3 d-flex align-items-center ">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success mx-3" @click="goToAddEmployee">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllEmployee">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <div class="mt-3 col-md-12 d-flex">
                <div class="col-md-6 me-3">
                    <EmployeeList v-if="filteredEmployeesCount > 0" :employees="filteredEmployees"
                        v-model:activeIndex="activeIndex" />
                    <p v-else>Danh sách nhân viên chưa được cập nhật.</p>
                </div>
                <div class="col-md-6" v-if="activeEmployee">
                    <h4>
                        Thông tin nhân viên
                        <i class="fa-regular fa-address-card"></i>
                    </h4>
                    <button @click="goToEditEmployee" class="p-1 bg-warning rounded ">
                        <i class="fas fa-edit"></i>
                        Hiệu chỉnh
                    </button>


                    <EmployeeCard :employee="activeEmployee" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EmployeeCard from "@/components/StaffComponent/EmployeeCard.vue";
import EmployeeList from "@/components/StaffComponent/EmployeeList.vue";
import InputSearch from "@/components/InputSearch.vue";
import EmployeeService from "@/services/employee.service";
export default {
    components: {
        EmployeeCard,
        InputSearch,
        EmployeeList,
    },
    data() {
        return {
            employees: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        employeeStrings() {
            return this.employees.map((employee) => {
                const { _id, msnv, hotennv, password, chucvu, diachi, sdt } = employee;
                return [_id, msnv, hotennv, password, chucvu, diachi, sdt].join("");
            });
        },
        filteredEmployees() {
            if (!this.searchText) return this.employees;
            return this.employees.filter((_employee, index) =>
                this.employeeStrings[index].includes(this.searchText)
            );
        },
        activeEmployee() {
            if (this.activeIndex < 0) return null;
            return this.filteredEmployees[this.activeIndex];
        },
        filteredEmployeesCount() {
            return this.filteredEmployees.length;
        },
    },
    methods: {
        async retrieveEmployees() {
            try {
                this.employees = await EmployeeService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveEmployees();
            this.activeIndex = -1;
        },
        async removeAllEmployee() {
            if (confirm("Bạn muốn xóa tất cả thông tin nhân viên?")) {
                try {
                    await EmployeeService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddEmployee() {
            this.$router.push({ name: "employee.add" });
        },
        goToEditEmployee() {
            this.$router.push({
                name: "employee.edit",
                params: { id: this.activeEmployee._id }
            })
        }

    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 850px;
}
</style>