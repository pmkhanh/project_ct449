<template>
    <Form @submit="submitTrade" :validation-schema="tradeFormSchema">
        <div class="form-group d-flex" >
            <strong>Nhân viên thực hiện:</strong>
           
            <p class="ms-3" > {{ tradeLocal.msnv + "-" + nhanvien.hotennv }}</p>
        </div>
        <div class="d-flex justify-content-evenly">
            <div class="form-group d-flex align-content-center pt-3 w-50">
                <label for="madocgia" class="me-3 w-25">Mã đọc giả</label>
                <select name="madocgia" class="form-control" v-model="tradeLocal.madocgia">
                    <option v-for="reader in readers" :value="reader.madocgia">
                        {{ reader.madocgia + "-" + reader.ten }}
                    </option>
                </select>
            </div>
            <div class="form-group d-flex align-content-center ms-3 pt-3 w-50">
                <label for="masach" class="me-3 w-25">Mã sách</label>
                <select name="masach" class="form-control" v-model="tradeLocal.masach">
                    <option v-for="book in books" :value="book.masach">
                        {{ book.masach + "-" + book.tensach }}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="ngaymuon">Ngày mượn</label>
            <Field name="ngaymuon" type="date" class="form-control" v-model="tradeLocal.ngaymuon" />
            <ErrorMessage name="ngaymuon" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ngaytra">Ngày trả</label>
            <Field name="ngaytra" type="date" class="form-control" v-model="tradeLocal.ngaytra" />
            <ErrorMessage name="ngaytra" class="error-feedback" />
        </div>


        <div class="form-group mt-3">
            <button class="btn btn-primary me-4" @click="submitTrade" >Lưu</button>
            <button v-if="tradeLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteTrade">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import bookService from "@/services/book.service";
import readerService from "@/services/reader.service";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:trade", "delete:trade"],
    props: {
        trade: { type: Object, required: true }
    },
    data() {
        const tradeFormSchema = yup.object().shape({
            madocgia: yup
                .string()
                .required("Mã đọc giả không được để trống"),

            masach: yup
                .string()
                .required("Mã sách không được để trống"),

            ngaymuon: yup
                .date()
                .required(),

            ngaytra: yup
                .date()
                .min(yup.ref('ngaymuon'), "Ngày trả phải sau ngày mượn")
                .required(),


        });
        return {
            tradeLocal: this.trade,
            tradeFormSchema,
            books: [],
            readers: [],
            nhanvien: null,
        };
    },
    created() {
        this.selectedBook();
        this.selectedReader();
        const staffJson = sessionStorage.getItem("nhanvien");
        this.nhanvien = JSON.parse(staffJson);

    },
    methods: {
        submitTrade() {
            this.$emit("submit:trade", this.tradeLocal);
        },
        deleteTrade() {
            this.$emit("delete:trade", this.tradeLocal.id);
        },
        async selectedBook() {
            this.books = await bookService.getAll();
            this.books.map((book) => {
                const { _id, masach, tensach } = book;
            });
        },
        async selectedReader() {
            this.readers = await readerService.getAll();
            this.readers.map((reader) => {
                const { _id, madocgia, ten } = reader;
            });
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>