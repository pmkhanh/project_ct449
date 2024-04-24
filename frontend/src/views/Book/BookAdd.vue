<template>
    <div v-if="book" class="page col-md-10">
        <h4 class="d-flex justify-content-center">Thêm sách</h4>
        <div class="container col-md-8">
            <Form @submit="saveBook" :validation-schema="bookFormSchema">
                <div class="form-group">
                    <label for="masach">Mã sách </label>
                    <Field name="masach" type="text" class="form-control" v-model="book.masach" />
                    <ErrorMessage name="masach" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="tensach">Tên sách </label>
                    <Field name="tensach" type="text" class="form-control" v-model="book.tensach" />
                    <ErrorMessage name="tensach" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="dongia">Đơn giá </label>
                    <Field name="dongia" type="number" min="0" class="form-control" v-model="book.dongia" />
                    <ErrorMessage name="dongia" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="soquyen">Số quyển </label>
                    <Field name="soquyen" type="number" min="0" class="form-control" v-model="book.soquyen" />
                    <ErrorMessage name="soquyen" class="error-feedback" />
                </div>
                <div class="form-group d-flex align-content-center pt-3">
                    <label for="namxuatban" class="me-3">Năm xuất bản</label>
                    <select name="namxuatban" class="form-control w-25 mt-1" v-model="book.namxuatban">
                        <option v-for="year in years" :value="year">
                            {{ year }}
                        </option>
                    </select>
                </div>
                <div class="form-group d-flex align-content-center pt-3">
                    <label for="manxb" class="me-3">Mã nhà xuất bản</label>
                    <select name="manxb" class="form-control w-25 mt-1" v-model="book.manxb">
                        <option v-for="publisher in publishers" :value="publisher.manxb">
                            {{ publisher.manxb + "-" + publisher.tennxb }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tacgia">Tác giả </label>
                    <Field name="tacgia" type="tel" class="form-control" v-model="book.tacgia" />
                    <ErrorMessage name="tacgia" class="error-feedback" />
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-primary" type="submit" @click="saveBook"><i
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
import bookService from "@/services/book.service";
import publisherService from "@/services/publisher.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:saveBook"],
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
                .required("Số quyển sách phải lớn hơn 0."),

            tacgia: yup
                .string()
                .max(50, "Tên tác giả tối đa 50 kí tự")
                .required("Tên tác giả không được để trống."),

        });
        return {
            book: {
                masach: '',
                tensach: '',
                dongia: 0,
                soquyen: 0,
                namxuatban: 1990,
                manxb: '',
                tacgia: '',
            },
            bookFormSchema,
            message: '',
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
        async saveBook() {
            try {
                await bookService.create(this.book)
                alert('Thêm thông tin sách thành công')
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error)
            }
        },
        generateYears() {
            for (let year = this.currentYear; year >= this.startYear; year--) {
                this.years.push(year);
            }
        },
        async selectedManxb() {
            this.publishers = await publisherService.getAll();
            this.publishers.map((publisher) => {
                const { _id, manxb} = publisher;
            });
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>