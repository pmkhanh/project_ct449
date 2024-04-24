<template>
    <div class="container page column">

<div class="d-flex p-3 justify-content-center">
    <div class="me-3">
        <h4>
            Nhà xuất bản
            <i class="fa-regular fa-building"></i>
        </h4>
    </div>
    <div class="col-md-8">
        <InputSearch v-model="searchText" />
    </div>
</div>
    <div class="page column ms-5">
        <div class="my-3 d-flex align-items-center ">
            <button class="btn btn-sm btn-primary" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success mx-3" @click="goToAddPublisher">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button class="btn btn-sm btn-danger" @click="removeAllPublisher">
                <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>

        <div class="mt-3 col-md-12 d-flex">
            <div class="col-md-6 me-3">
                <PublisherList v-if="filteredPublishersCount > 0" :publishers="filteredPublishers" v-model:activeIndex="activeIndex" />
                <p v-else>Nhà xuất bản chưa được cập nhật.</p>
            </div>
            <div class="col-md-6" v-if="activePublisher">
                <h4>
                    Thông tin nhà xuất bản
                    <i class="fa-regular fa-building"></i>
                </h4>
                <button @click="goToEditPublisher" class="p-1 bg-warning rounded ">
                    <i class="fas fa-edit"></i>
                    Hiệu chỉnh
                </button>


                <PublisherCard :publisher="activePublisher" />
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import PublisherCard from "@/components/PublisherComponent/PublisherCard.vue";
import PublisherList from "@/components/PublisherComponent/PublisherList.vue";
import InputSearch from "@/components/InputSearch.vue";
import PublisherService from "@/services/publisher.service";
export default {
    components: {
        PublisherCard,
        InputSearch,
        PublisherList,
    },
    data() {
        return {
            publishers: [],
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
        publisherStrings() {
            return this.publishers.map((publisher) => {
                const { _id, manxb, tennxb, diachi } = publisher;
                return [_id, manxb, tennxb, diachi].join("");
            });
        },
        filteredPublishers() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter((_publisher, index) =>
                this.publisherStrings[index].includes(this.searchText)
            );
        },
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishers[this.activeIndex];
        },
        filteredPublishersCount() {
            return this.filteredPublishers.length;
        },
    },
    methods: {
        async retrievePublishers() {
            try {
                this.publishers = await PublisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublishers();
            this.activeIndex = -1;
        },
        async removeAllPublisher() {
            if (confirm("Bạn muốn xóa tất cả thông tin?")) {
                try {
                    await PublisherService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddPublisher() {
            this.$router.push({ name: "publisher.add" });
        },
        goToEditPublisher() {
            this.$router.push({
                name: "publisher.edit",
                params: { id: this.activePublisher._id }
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