<template>
    <Form @submit="submitReader" :validation-schema="readerFormSchema">
        <div class="form-group">
            <label for="madocgia">Mã đọc giả </label>
            <Field name="madocgia" type="text" class="form-control" v-model="readerLocal.madocgia" />
            <ErrorMessage name="madocgia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="holot">Họ lót </label>
            <Field name="holot" type="text" class="form-control" v-model="readerLocal.holot" />
            <ErrorMessage name="holot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ten">Tên</label>
            <Field name="ten" type="text" class="form-control" v-model="readerLocal.ten" />
            <ErrorMessage name="ten" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ngaysinh">Ngày sinh </label>
            <Field name="ngaysinh" type="date" class="form-control" v-model="readerLocal.ngaysinh" />
            <ErrorMessage name="ngaysinh" class="error-feedback" />
        </div>
        <div class="form-group d-flex align-content-center pt-3">
                    <label for="phai" class="me-3">Giới tính</label>
                    <select name="phai" class="form-control w-25" v-model="readerLocal.phai">
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                    </select>
                </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ </label>
            <Field name="diachi" type="text" class="form-control" v-model="readerLocal.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dienthoai">Điện thọai </label>
            <Field name="dienthoai" type="text" class="form-control" v-model="readerLocal.dienthoai" />
            <ErrorMessage name="dienthoai" class="error-feedback" />
        </div>
        
        <div class="form-group mt-3">
            <button class="btn btn-primary me-4">Lưu</button>
            <button v-if="readerLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteReader">
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
    emits: ["submit:reader", "delete:reader"],
    props: {
        reader: { type: Object, required: true }
    },
    data() {
        const readerFormSchema = yup.object().shape({
            madocgia: yup
                .string()
                .min(4, "Mã đọc giả ít nhất 4 kí tự")
                .max(50, "Mã đọc giả bản tối đa 50 kí tự")
                .required("Mã đọc giả bản không được để trống."),

            holot: yup
                .string()
                .max(10, "Tên đọc giả bản tối đa 10 kí tự"),
            
            ten: yup
                .string()
                .max(20, "Tên đọc giả tối đa 20 kí tự")
                .required("Tên đọc giả không được để trống."),

            ngaysinh: yup
                .date()
                .required("Địa chỉ không được để trống."),
            
            phai: yup
                .string(),
            
            diachi: yup
                .string()
                .max(50, "Địa chỉ tối đa 50 kí tự")
                .required("Địa chỉ không được để trống."),

            dienthoai: yup
                .string()
                .max(10, "Số điện thoại tối đa 10 kí tự")
                .required("Số điện thoại không được để trống."),

            
        });
        return {
            readerLocal: this.reader,
            readerFormSchema,
        };
    },

    methods: {
        submitReader() {

            this.$emit("submit:reader", this.readerLocal);
        },
        deleteReader() {
            this.$emit("delete:reader", this.readerLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>