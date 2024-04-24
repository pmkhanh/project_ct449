<script>
export default {
    props: {
        employee: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã số nhân viên:</strong>
            {{ employee.msnv }}
        </div>
        <div class="p-1">
            <strong>Họ tên nhân viên:</strong>
            {{ employee.hotennv }}
        </div>
        <div class="p-1">
            <strong>Chức vụ:</strong>
            {{ employee.chucvu }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ employee.diachi }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ employee.sdt }}
        </div>
    </div>
</template>