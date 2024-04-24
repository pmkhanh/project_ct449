<template>
    <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
        <div class="form-group">
            <label for="manxb">Mã nhà xuất bản </label>
            <Field name="manxb" type="text" class="form-control" v-model="publisherLocal.manxb" />
            <ErrorMessage name="manxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tennxb">Tên nhà xuất bản </label>
            <Field name="tennxb" type="text" class="form-control" v-model="publisherLocal.tennxb" />
            <ErrorMessage name="tennxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ </label>
            <Field name="diachi" type="text" class="form-control" v-model="publisherLocal.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        
        <div class="form-group mt-3">
            <button class="btn btn-primary me-4">Lưu</button>
            <button v-if="publisherLocal._id" type="button" class="ml-2 btn btn-danger" @click="deletePublisher">
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
    emits: ["submit:publisher", "delete:publisher"],
    props: {
        publisher: { type: Object, required: true }
    },
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
            publisherLocal: this.publisher,
            publisherFormSchema,
        };
    },

    methods: {
        submitPublisher() {

            this.$emit("submit:publisher", this.publisherLocal);
        },
        deletePublisher() {
            this.$emit("delete:publisher", this.publisherLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>