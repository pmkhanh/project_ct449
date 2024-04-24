<script>
export default {
    props: {
        trade: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã nhân viên:</strong>
            {{ trade.msnv }}
        </div>
        <div class="p-1">
            <strong>Mã đọc giả:</strong>
            {{ trade.madocgia }}
        </div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ trade.masach }}
        </div>
        <div class="p-1">
            <strong>Ngày mượn:</strong>
            {{ trade.ngaymuon }}
        </div>
        <div class="p-1">
            <strong>Ngày trả:</strong>
            {{ trade.ngaytra }}
        </div>
    </div>
</template>