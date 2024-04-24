<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
    computed: {
    formattedPrice() {
      return this.book.dongia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VNĐ');
    },
  },

};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ book.masach }}
        </div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ book.tensach }}
        </div>
        <div class="p-1">
            <strong>Đơn giá:</strong>
            {{ formattedPrice }}
        </div>
        <div class="p-1">
            <strong>Số quyển:</strong>
            {{ book.soquyen }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong>
            {{ book.namxuatban }}
        </div>
        <div class="p-1">
            <strong>Mã nhà xuất bản:</strong>
            {{ book.manxb }}
        </div>
        <div class="p-1">
            <strong>Tác giả:</strong>
            {{ book.tacgia }}
        </div>
    </div>
</template>