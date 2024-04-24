<template>
    <div v-if="employee" class="page col-md-10">
        <h4 class="d-flex justify-content-center">Thêm thông tin nhân viên</h4>
        <div class="container col-md-8">
            <Form @submit="saveEmployee" :validation-schema="employeeFormSchema">
                <div class="form-group">
                    <label for="msnv">Mã số nhân viên </label>
                    <Field name="msnv" type="text" class="form-control" v-model="employee.msnv" />
                    <ErrorMessage name="msnv" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="hotennv">Họ tên nhân viên</label>
                    <Field name="hotennv" type="text" class="form-control" v-model="employee.hotennv" />
                    <ErrorMessage name="hotennv" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <Field name="password" type="password" class="form-control" v-model="employee.password" />
                    <ErrorMessage name="password" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="chucvu">Chức vụ</label>
                    <Field name="chucvu" type="text" class="form-control" v-model="employee.chucvu" />
                    <ErrorMessage name="chucvu" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="diachi">Địa chỉ</label>
                    <Field name="diachi" type="text" class="form-control" v-model="employee.diachi" />
                    <ErrorMessage name="diachi" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="sdt">Điện thoại</label>
                    <Field name="sdt" type="text" class="form-control" v-model="employee.sdt" />
                    <ErrorMessage name="sdt" class="error-feedback" />
                </div>

                <div class="form-group mt-3">
                    <button class="btn btn-primary" type="submit" @click="saveEmployee"><i
                            class="fa-solid fa-floppy-disk"></i>
                        Lưu</button>
                </div>
            </Form>
        </div>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import EmployeeService from "@/services/employee.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:saveEmployee"],
    data() {

        const employeeFormSchema = yup.object().shape({
            msnv: yup
                .string()
                .min(8, "Mã nhân viên ít nhất 8 kí tự")
                .required("Mã nhân viên không được để trống"),

            hotennv: yup
                .string()
                .required("Họ tên nhân viên không được để trống"),

            password: yup
                .string()
                .min(8, "Mật khẩu ít nhất 8 kí tự")
                .required("Mật khẩu không được để trống"),

            chucvu: yup
                .string()
                .required("Chức vụ không được để trống"),

            diachi: yup
                .string()
                .max(50, "Địa chỉ tối đa 50 kí tự")
                .required("Địa chỉ không được để trống."),

            sdt: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),

        });
        return {
            employee: {
                msnv: '',
                hotennv: '',
                password: '',
                chucvu: '',
                diachi: '',
                sdt: '',
            },
            employeeFormSchema,
            message: ''
        };
    },
    methods: {
        async saveEmployee() {
            try {
                await EmployeeService.create(this.employee)
                alert('Thêm thông tin nhân viên thành công')
                this.$router.push({ name: "employee" });
            } catch (error) {
                console.log(error)
            }
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>