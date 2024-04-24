<template>
    <div class="container col-md-6 d-flex flex-column text-center ">
        <h3 class="text-center">Đăng Nhập</h3>
        <div class="p-3">
            <label class="w-25" for="msnv">Mã nhân viên: </label>
            <input type="text" class="w-25" v-model="msnv">
        </div>
        <div class="p-3">
            <label class=" w-25" for="password">Mật khẩu: </label>
            <input type="password" class="w-25" v-model="password">
        </div>
        <div class="p-3">
            <button type="submit" class="w-25 rounded" @click="loginStaff">Đăng nhập</button>
        </div>

    </div>
</template>
<script>
import EmployeeService from "@/services/employee.service";
export default {
    data() {
        return {
            data: {
                msnv: '',
                password: '',
            },
        };
    },
    created() {
        this.loginStaff();
    },
    methods: {
        async loginStaff() {
            if (this.msnv && this.password) {
                const data = {
                    msnv: this.msnv,
                    password: this.password
                };

                try {
                    const staff = await EmployeeService.login(data);
                    if (staff) {
                        sessionStorage.setItem("nhanvien", JSON.stringify(staff));
                        alert("Đăng nhập thành công");
                        window.location.reload();
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },

    }
}
</script>