<template>
    <Form @submit="submitEmployee" :validation-schema="employeeFormSchema">
        <div class="form-group">
            <label for="msnv">Mã số nhân viên </label>
            <Field disabled name="msnv" type="text" class="form-control" v-model="employeeLocal.msnv" />
            <ErrorMessage name="msnv" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="hotennv">Họ tên nhân viên </label>
            <Field name="hotennv" type="text" class="form-control" v-model="employeeLocal.hotennv" />
            <ErrorMessage name="hotennv" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="chucvu">Chức vụ </label>
            <Field name="chucvu" type="text" class="form-control" v-model="employeeLocal.chucvu" />
            <ErrorMessage name="chucvu" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ </label>
            <Field name="diachi" type="text" class="form-control" v-model="employeeLocal.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="sdt">Điện thọai </label>
            <Field name="sdt" type="text" class="form-control" v-model="employeeLocal.sdt" />
            <ErrorMessage name="sdt" class="error-feedback" />
        </div>
        
        <div class="form-group mt-3">
            <button class="btn btn-primary me-4">Lưu</button>
            <button v-if="employeeLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteEmployee">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:employee", "delete:employee"],
    props: {
        employee: { type: Object, required: true }
    },
    data() {
        const employeeFormSchema = yup.object().shape({
            hotennv: yup
                .string()
                .required("Họ tên nhân viên không được để trống"),
                
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
            employeeLocal: this.employee,
            employeeFormSchema,
        };
    },

    methods: {
        submitEmployee() {

            this.$emit("submit:employee", this.employeeLocal);
        },
        deleteEmployee() {
            this.$emit("delete:employee", this.employeeLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>