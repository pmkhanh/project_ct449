<template>
    <div v-if="trade" class="page col-md-10">
        <h4 class="d-flex justify-content-center">Hiệu chỉnh thông tin nhân viên</h4>
        <div class="container col-md-8">
            <TradeForm :trade="trade" @submit:trade="updateTrade" @delete:trade="deleteTrade" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import TradeForm from "@/components/TradeComponent/TradeForm.vue";
import TradeService from "@/services/trade.service";
export default {
    components: {
        TradeForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            trade: null,
            nhanvien: null,
            message: "",
        };
    },
    created() {
        const staffJson = sessionStorage.getItem("nhanvien");
        this.nhanvien = JSON.parse(staffJson);
    },
    methods: {
        async getTrade(id) {
            try {
                this.trade = await TradeService.get(id);

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
        async updateTrade(data) {
            try {
                this.data.msnv = nhanvien.msnv;
                console.log(this.data);
                await TradeService.update(this.trade._id, data);
                alert("Thông tin nhân viên được cập nhật thành công!")
                this.$router.push({
                    name: "trade",
                })

            } catch (error) {
                console.log(error);
            }
        },
        async deleteTrade() {
            if (confirm("Bạn muốn xóa thông tin nhân viên này?")) {
                try {
                    await TradeService.delete(this.trade._id);
                    this.$router.push({ name: "trade" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getTrade(this.id);
        this.message = "";
    },
};
</script>