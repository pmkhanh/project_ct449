<template>
    <div v-if="reader" class="page col-md-10">
        <h4 class="d-flex justify-content-center" >Hiệu chỉnh thông tin đọc giả</h4>
        <div class="container col-md-8">
            <ReaderForm :reader="reader" @submit:reader="updateReader" @delete:reader="deleteReader" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import ReaderForm from "@/components/ReaderComponent/ReaderForm.vue";
import ReaderService from "@/services/reader.service";
export default {
    components: {
        ReaderForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            reader: null,
            message: "",
        };
    },
    methods: {
        async getReader(id) {
            try {
                this.reader = await ReaderService.get(id);
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
        async updateReader(data) {
            try {
                await ReaderService.update(this.reader._id, data);
                alert("Thông tin đọc giả được cập nhật thành công!")
                this.$router.push({
                    name: "reader",
                })

            } catch (error) {
                console.log(error);
            }
        },
        async deleteReader() {
            if (confirm("Bạn muốn xóa thông tin đọc giả này?")) {
                try {
                    await ReaderService.delete(this.reader._id);
                    this.$router.push({ name: "reader" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getReader(this.id);
        this.message = "";
    },
};
</script>