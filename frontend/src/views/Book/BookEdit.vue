<template>
    <div v-if="book" class="page col-md-10">
        <h4 class="d-flex justify-content-center" >Hiệu chỉnh thông tin sách</h4>
        <div class="container col-md-8">
            <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import BookForm from "@/components/BookComponent/BookForm.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        BookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                alert("Thông tin sách được cập nhật thành công!")
                this.$router.push({
                    name: "book",
                })

            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook() {
            if (confirm("Bạn muốn xóa quyển sách này?")) {
                try {
                    await BookService.delete(this.book._id);
                    this.$router.push({ name: "book" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>