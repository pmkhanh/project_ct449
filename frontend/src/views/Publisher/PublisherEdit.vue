<template>
    <div v-if="publisher" class="page col-md-10">
        <h4 class="d-flex justify-content-center" >Hiệu chỉnh thông tin nhà xuất bản</h4>
        <div class="container col-md-8">
            <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher" @delete:publisher="deletePublisher" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import PublisherForm from "@/components/PublisherComponent/PublisherForm.vue";
import PublisherService from "@/services/publisher.service";
export default {
    components: {
        PublisherForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await PublisherService.get(id);
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
        async updatePublisher(data) {
            try {
                await PublisherService.update(this.publisher._id, data);
                alert("Thông tin nhà xuất bản được cập nhật thành công!")
                this.$router.push({
                    name: "publisher",
                })

            } catch (error) {
                console.log(error);
            }
        },
        async deletePublisher() {
            if (confirm("Bạn muốn xóa thông tin nhà xuất bản này?")) {
                try {
                    await PublisherService.delete(this.publisher._id);
                    this.$router.push({ name: "publisher" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getPublisher(this.id);
        this.message = "";
    },
};
</script>