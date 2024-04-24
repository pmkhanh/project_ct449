<template>
    <div v-if="reader" class="page col-md-10">
        <h4 class="d-flex justify-content-center">Thêm thông tin đọc giả</h4>
        <div class="container col-md-8">
            <Form @submit="saveReader" :validation-schema="readerFormSchema">
                <div class="form-group">
                    <label for="madocgia">Mã đọc giả </label>
                    <Field name="madocgia" type="text" class="form-control" v-model="reader.madocgia" />
                    <ErrorMessage name="madocgia" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="holot">Họ lót</label>
                    <Field name="holot" type="text" class="form-control" v-model="reader.holot" />
                    <ErrorMessage name="holot" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="ten">Tên đọc giả</label>
                    <Field name="ten" type="text" class="form-control" v-model="reader.ten" />
                    <ErrorMessage name="ten" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="ngaysinh">Ngày sinh</label>
                    <Field name="ngaysinh" type="date" class="form-control" v-model="reader.ngaysinh" />
                    <ErrorMessage name="ngaysinh" class="error-feedback" />
                </div>
                <div class="form-group d-flex align-content-center pt-3">
                    <label for="phai" class="me-3">Giới tính</label>
                    <select name="phai" class="form-control w-25" v-model="reader.phai">
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="diachi">Địa chỉ</label>
                    <Field name="diachi" type="text" class="form-control" v-model="reader.diachi" />
                    <ErrorMessage name="diachi" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="dienthoai">Điện thoại</label>
                    <Field name="dienthoai" type="text" class="form-control" v-model="reader.dienthoai" />
                    <ErrorMessage name="dienthoai" class="error-feedback" />
                </div>

                <div class="form-group mt-3">
                    <button class="btn btn-primary" type="submit" @click="saveReader"><i
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
import ReaderService from "@/services/reader.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:saveReader"],
    data() {

        const readerFormSchema = yup.object().shape({
            madocgia: yup
                .string()
                .min(4, "Mã đọc giả bản ít nhất 4 kí tự")
                .max(50, "Mã đọc giả bản tối đa 50 kí tự")
                .required("Mã đọc giả bản không được để trống."),

            holot: yup
                .string()
                .max(50, "Tên đọc giả bản tối đa 50 kí tự")
                .required("Họ lót bản không được để trống."),

            ten: yup
                .string()
                .max(50, "Tên đọc giả bản tối đa 50 kí tự")
                .required("Tên đọc giả bản không được để trống."),

            phai: yup
                .string(),

            diachi: yup
                .string()
                .max(50, "Địa chỉ tối đa 50 kí tự")
                .required("Địa chỉ không được để trống."),

            dienthoai: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),

        });
        return {
            reader: {
                madocgia: '',
                holot: '',
                ten: '',
                ngaysinh: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'),
                phai: '',
                diachi: '',
                dienthoai: '',
            },
            readerFormSchema,
            message: ''
        };
    },
    methods: {
        async saveReader() {
            try {
                await ReaderService.create(this.reader)
                alert('Thêm thông tin đọc giả thành công')
                this.$router.push({ name: "reader" });
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