<script>
export default {
    props: {
        reader: { type: Object, required: true },
    },
    computed: {
    // Computed property để định dạng ngày tháng
    formattedDate() {
      const date = new Date(this.reader.ngaysinh);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã đọc giả:</strong>
            {{ reader.madocgia }}
        </div>
        <div class="p-1">
            <strong>Họ lót:</strong>
            {{ reader.holot }}
        </div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ reader.ten }}
        </div>
        <div class="p-1">
            <strong>Ngày sinh:</strong>
            {{ formattedDate }}
        </div>
        <div class="p-1">
            <strong>Phái:</strong>
            {{ reader.phai }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ reader.diachi }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ reader.dienthoai }}
        </div>
    </div>
</template>