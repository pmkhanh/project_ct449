<script>
export default {
    props: {
        trades: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    
    methods: {
        updateActiveIndex(index) {
            
            this.$emit("update:activeIndex", index);
        },
        
    },
    
    
};
</script>
<template>

    <ul class="list-group">
        <li class="list-group-item" v-for="(trade, index) in trades" :key="trade._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{trade.madocgia + ": " + trade.ngaymuon}}
        </li>
    </ul>
</template>