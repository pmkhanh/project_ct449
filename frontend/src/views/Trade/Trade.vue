<template>
    <div class="container page column">

        <div class="d-flex p-3 justify-content-center">
            <div class="me-3">
                <h4>
                    Theo dõi mượn sách
                    <i class="fa-solid fa-rotate"></i>
                </h4>
            </div>
            <div class=" col-md-8 ">
                <InputSearch v-model="searchText" />
            </div>
        </div>
        <div class="page column">
            <div class="my-3 d-flex align-items-center ">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success mx-3" @click="goToAddTrade">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllTrade">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <div class="mt-3 col-md-12 d-flex">
                <div class="col-md-6 me-3">
                    <TradeList v-if="filteredTradesCount > 0" :trades="filteredTrades"
                        v-model:activeIndex="activeIndex" />
                    <p v-else>Không có sách được mượn.</p>
                </div>
                <div class="col-md-6" v-if="activeTrade">
                    <h4>
                        Thông tin đọc giả mượn sách
                        <i class="fa-solid fa-rotate"></i>
                    </h4>
                    <button @click="goToEditTrade" class="p-1 bg-warning rounded ">
                        <i class="fas fa-edit"></i>
                        Hiệu chỉnh
                    </button>


                    <TradeCard :trade="activeTrade" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import InputSearch from "@/components/InputSearch.vue";
import TradeCard from "@/components/TradeComponent/TradeCard.vue";
import TradeList from "@/components/TradeComponent/TradeList.vue";
import TradeService from "@/services/trade.service";

export default {
    components: {
        TradeCard,
        InputSearch,
        TradeList,
    },
    data() {
        return {
            trades: [],

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
        tradeStrings() {

            return this.trades.map((trade) => {
                const { _id, madocgia, masach, ngaymuon, ngaytra } = trade;
                return [_id, madocgia, masach, ngaymuon, ngaytra].join("");
            });
        },
        filteredTrades() {
            if (!this.searchText) return this.trades;
            return this.trades.filter((_trade, index) =>
                this.tradeStrings[index].includes(this.searchText)
            );
        },
        activeTrade() {
            if (this.activeIndex < 0) return null;
            return this.filteredTrades[this.activeIndex];
        },
        filteredTradesCount() {
            return this.filteredTrades.length;
        },
    },
    methods: {
        async retrieveTrades() {
            try {
                this.trades = await TradeService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveTrades();
            this.activeIndex = -1;
        },
        async removeAllTrade() {
            if (confirm("Bạn muốn xóa tất cả thông tin?")) {
                try {
                    await TradeService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddTrade() {
            this.$router.push({ name: "trade.add" });
        },
        goToEditTrade() {
            this.$router.push({
                name: "trade.edit",
                params: { id: this.activeTrade._id }
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
    max-width: 900px;
}
</style>