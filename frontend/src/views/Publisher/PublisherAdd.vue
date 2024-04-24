<template>
    <div v-if="publisher" class="page col-md-10">
        <h4 class="d-flex justify-content-center">Thêm thông tin nhà xuất bản</h4>
        <div class="container col-md-8">
            <Form @submit="savePublisher" :validation-schema="publisherFormSchema">
                <div class="form-group">
                    <label for="manxb">Mã nhà xuất bản </label>
                    <Field name="manxb" type="text" class="form-control" v-model="publisher.manxb" />
                    <ErrorMessage name="manxb" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="tennxb">Tên nhà xuất bản </label>
                    <Field name="tennxb" type="text" class="form-control" v-model="publisher.tennxb" />
                    <ErrorMessage name="tennxb" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="diachi">Địa chỉ </label>
                    <Field name="diachi" type="text" class="form-control" v-model="publisher.diachi" />
                    <ErrorMessage name="diachi" class="error-feedback" />
                </div>

                <div class="form-group mt-3">
                    <button class="btn btn-primary" type="submit" @click="savePublisher"><i
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
import publisherService from "@/services/publisher.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:savePublisher"],
    data() {

        const publisherFormSchema = yup.object().shape({
            manxb: yup
                .string()
                .min(4, "Mã nhà xuất bản ít nhất 4 kí tự")
                .max(50, "Mã nhà xuất bản tối đa 50 kí tự")
                .required("Mã nhà xuất bản không được để trống."),

            tennxb: yup
                .string()
                .max(50, "Tên nhà xuất bản tối đa 50 kí tự")
                .required("Tên nhà xuất bản không được để trống."),

            diachi: yup
                .string()
                .max(50, "Địa chỉ tối đa 50 kí tự")
                .required("Địa chỉ không được để trống."),

        });
        return {
            publisher: {
                manxb: '',
                tennxb: '',
                diachi: '',
            },
            publisherFormSchema,
            message: ''
        };
    },
    methods: {
        async savePublisher() {
            try {
                await publisherService.create(this.publisher)
                this.$router.push({ name: "publisher" });
                alert('Thêm thông tin nhà xuất bản thành công')
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