<template>
    <div class="container page column">

    <div class="d-flex p-3 justify-content-center">
        <div class="me-3">
            <h4>
                Sách
                <i class="fa-solid fa-book"></i>
            </h4>
        </div>
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
    </div>
    <div class="page column ">
        <div class="my-3 d-flex align-items-center ">
            <button class="btn btn-sm btn-primary" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success mx-3" @click="goToAddBook">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button class="btn btn-sm btn-danger" @click="removeAllBooks">
                <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>

        <div class="mt-3 col-md-12 d-flex">
            <div class="col-md-6 me-3">
                <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
                <p v-else>Sách chưa được cập nhật.</p>
            </div>
            <div class="col-md-6" v-if="activeBook">
                <h4>
                    Thông tin sách
                    <i class="fa-solid fa-book"></i>
                </h4>
                <button @click="goToEditBook" class="p-1 bg-warning rounded ">
                    <i class="fas fa-edit"></i>
                    Hiệu chỉnh
                </button>


                <BookCard :book="activeBook" />
            </div>
        </div>
    </div>
</div>

</template>
<script>
import BookCard from "@/components/BookComponent/BookCard.vue";
import BookList from "@/components/BookComponent/BookList.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { _id, masach, tensach, dongia, soquyen, namxuatban, manxb, tacgia } = book;
                return [_id, masach, tensach, dongia, soquyen, namxuatban, manxb, tacgia].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả sách?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddBook() {
            this.$router.push({ name: "book.add" });
        },
        goToEditBook() {
            console.log('id', this.activeBook._id)
            this.$router.push({
                name: "book.edit",
                params: { id: this.activeBook._id }
            })
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>