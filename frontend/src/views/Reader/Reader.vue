<template>
    <div class="container page column">

        <div class="d-flex p-3 justify-content-center">
            <div class="me-3">
                <h4>
                    Đọc giả
                    <i class="fa-solid fa-book-open-reader"></i>
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
                <button class="btn btn-sm btn-success mx-3" @click="goToAddReader">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllReader">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <div class="mt-3 col-md-12 d-flex">
                <div class="col-md-6 me-3">
                    <ReaderList v-if="filteredReadersCount > 0" :readers="filteredReaders"
                        v-model:activeIndex="activeIndex" />
                    <p v-else>Đọc giả chưa được cập nhật.</p>
                </div>
                <div class="col-md-6" v-if="activeReader">
                    <h4>
                        Thông tin đọc giả
                        <i class="fa-solid fa-book-open-reader"></i>
                    </h4>
                    <button @click="goToEditReader" class="p-1 bg-warning rounded ">
                        <i class="fas fa-edit"></i>
                        Hiệu chỉnh
                    </button>


                    <ReaderCard :reader="activeReader" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ReaderCard from "@/components/ReaderComponent/ReaderCard.vue";
import ReaderList from "@/components/ReaderComponent/ReaderList.vue";
import InputSearch from "@/components/InputSearch.vue";
import ReaderService from "@/services/reader.service";
export default {
    components: {
        ReaderCard,
        InputSearch,
        ReaderList,
    },
    data() {
        return {
            readers: [],
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
        readerStrings() {
            return this.readers.map((reader) => {
                const { _id, madocgia, holot, ten, ngaysinh, phai, diachi, dienthoai } = reader;
                return [_id, madocgia, holot, ten, ngaysinh, phai, diachi, dienthoai].join("");
            });
        },
        filteredReaders() {
            if (!this.searchText) return this.readers;
            return this.readers.filter((_reader, index) =>
                this.readerStrings[index].includes(this.searchText)
            );
        },
        activeReader() {
            if (this.activeIndex < 0) return null;
            return this.filteredReaders[this.activeIndex];
        },
        filteredReadersCount() {
            return this.filteredReaders.length;
        },
    },
    methods: {
        async retrieveReaders() {
            try {
                this.readers = await ReaderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveReaders();
            this.activeIndex = -1;
        },
        async removeAllReader() {
            if (confirm("Bạn muốn xóa tất cả thông tin đọc giả?")) {
                try {
                    await ReaderService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddReader() {
            this.$router.push({ name: "reader.add" });
        },
        goToEditReader() {
            this.$router.push({
                name: "reader.edit",
                params: { id: this.activeReader._id }
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
    max-width: 900px;
}
</style>