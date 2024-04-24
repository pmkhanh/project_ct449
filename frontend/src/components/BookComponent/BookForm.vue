<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="masach">Mã sách </label>
            <Field name="masach" type="text" class="form-control" v-model="bookLocal.masach" />
            <ErrorMessage name="masach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tensach">Tên sách </label>
            <Field name="tensach" type="text" class="form-control" v-model="bookLocal.tensach" />
            <ErrorMessage name="tensach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dongia">Đơn giá </label>
            <Field name="dongia" type="number" min="0" class="form-control" v-model="bookLocal.dongia" />
            <ErrorMessage name="dongia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="soquyen">Số quyển </label>
            <Field name="soquyen" min="0" type="number" class="form-control" v-model="bookLocal.soquyen" />
            <ErrorMessage name="soquyen" class="error-feedback" />
        </div>

        <div class="form-group d-flex align-content-center pt-3">
            <label for="namxuatban" class="me-3">Năm xuất bản</label>
            <select name="namxuatban" class="form-control w-25" v-model="bookLocal.namxuatban">
                <option v-for="year in years" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>

        <div class="form-group d-flex align-content-center pt-3">
            <label for="manxb" class="me-3">Mã nhà xuất bản</label>
            <select name="manxb" class="form-control w-25" v-model="bookLocal.manxb">
                <option selected>{{ bookLocal.manxb }}</option>
                <option v-for="publisher in publishers" :value="publisher.manxb">

                    {{ publisher.manxb }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="tacgia">Tác giả </label>
            <Field name="tacgia" type="tel" class="form-control" v-model="bookLocal.tacgia" />
            <ErrorMessage name="tacgia" class="error-feedback" />
        </div>
        <div class="form-group mt-3">
            <button class="btn btn-primary me-4">Lưu</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import publisherService from "@/services/publisher.service";
import * as yup from "yup";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            masach: yup
                .string()
                .required("Mã sách không được để trống.")
                .min(4, "Mã sách phải ít nhất 4 ký tự.")
                .max(50, "Mã sách có nhiều nhất 50 ký tự."),

            tensach: yup
                .string()
                .required("Tên sách không được để trống.")
                .max(50, "Tên sách tối đa 50 ký tự."),

            dongia: yup
                .number()
                .required("Đơn giá không được để trống."),

            soquyen: yup
                .number()
                .required("Số quyển phải lớn hơn 0."),

            tacgia: yup
                .string()
                .max(50, "Tên tác giả tối đa 50 kí tự")
                .required("Tên tác giả không được để trống."),

        });
        return {
            bookLocal: this.book,
            bookFormSchema,
            startYear: 1900,
            currentYear: new Date().getFullYear(),
            years: [],
            publishers: [],
        };
    },
    created() {
        this.generateYears();
        this.selectedManxb();
    },

    methods: {
        submitBook() {

            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        generateYears() {
            for (let year = this.currentYear; year >= this.startYear; year--) {
                this.years.push(year);
            }
        },
        async selectedManxb() {
            this.publishers = await publisherService.getAll();
            this.publishers.map((publisher) => {
                const { _id, manxb } = publisher;
            });
        }
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>