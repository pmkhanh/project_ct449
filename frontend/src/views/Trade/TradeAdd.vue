<template>
    <div v-if="trade" class="page col-md-10">
        <h4 class="d-flex justify-content-center">Thêm thông tin mượn sách</h4>
        <div class="container col-md-8">
            <Form @submit="saveTrade" :validation-schema="tradeFormSchema">
                <div class="form-group d-flex" >
                    <strong>Nhân viên thực hiện:</strong> <p class="ms-3" > {{nhanvien.msnv + "-" + nhanvien.hotennv }}</p>
                </div>
                <div class="d-flex justify-content-evenly">
                    
                    <div class="form-group d-flex align-content-center pt-3 w-50">
                        <label for="madocgia" class="me-3 w-25">Mã đọc giả</label>
                        <select name="madocgia" class="form-control" v-model="trade.madocgia">
                            <option v-for="reader in readers" :value="reader.madocgia">
                                {{ reader.madocgia + "-" + reader.ten }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group d-flex align-content-center ms-3 pt-3 w-50">
                        <label for="masach" class="me-3 w-25">Mã sách</label>
                        <select name="masach" class="form-control" v-model="trade.masach">
                            <option v-for="book in books" :value="book.masach">
                                {{ book.masach + "-" + book.tensach }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ngaymuon">Ngày mượn</label>
                    <Field name="ngaymuon" type="date" class="form-control" v-model="trade.ngaymuon" />
                    <ErrorMessage name="ngaymuon" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="ngaytra">Ngày trả</label>
                    <Field name="ngaytra" type="date" class="form-control" v-model="trade.ngaytra" />
                    <ErrorMessage name="ngaytra" class="error-feedback" />
                </div>

                <div class="form-group mt-3">
                    <button class="btn btn-primary" type="submit" @click="saveTrade"><i
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
import TradeService from "@/services/trade.service";
import BookService from "@/services/book.service";
import readerService from "@/services/reader.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:saveTrade"],
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
            trade: {
                madocgia: '',
                masach: '',
                ngaymuon: '',
                ngaytra: '',
                msnv: '',
            },
            tradeFormSchema,
            message: '',
            books: [],
            readers: [],
            nhanvien: '',
        };
    },
    created() {
        this.selectedBook();
        this.selectedReader();
        const staffJson = sessionStorage.getItem("nhanvien");
        this.nhanvien = JSON.parse(staffJson);
    },
    methods: {
        async saveTrade() {
            try {
                this.trade.msnv = this.nhanvien.msnv;
                await TradeService.create(this.trade)
                alert('Thành công')
                this.$router.push({ name: "trade" });
            } catch (error) {
                console.log(error)
            }
        },
        async selectedBook() {
            this.books = await BookService.getAll();
            this.books.map((book) => {
                const { _id, masach, tensach, soquyen } = book;
            });
        },
        async selectedReader() {
            this.readers = await readerService.getAll();
            this.readers.map((reader) => {
                const { _id, madocgia, ten } = reader;
            });
        }
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>