<template>
    <div class="container">

        <nav class="navbar navbar-expand navbar-dark bg-info rounded ">
            <div class="navbar-nav p-3">
                <div class="collapse navbar-collapse ">
                    <ul class="navbar-nav ">
                        <li class="nav-item  ">
                            <a href="/" class="navbar-brand text-dark">Ứng dụng Quản lý mượn sách</a>
                        </li>
                        <li class="nav-item text-red">
                            <router-link :to="{ name: 'book' }" class="nav-link text-dark">
                                <i class="fa-solid fa-book"></i>
                                Sách
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link :to="{ name: 'publisher' }" class="nav-link text-dark">
                                <i class="fa-regular fa-building"></i>
                                Nhà Xuất Bản
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'reader' }" class="nav-link text-dark">
                                <i class="fa-solid fa-book-open-reader"></i>
                                Đọc Giả
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link :to="{ name: 'trade' }" class="nav-link text-dark">
                                <i class="fa-solid fa-rotate"></i>
                                Theo Dõi Mượn Sách
                            </router-link>
                        </li>

                        <li class="nav-item" v-if="!nhanvien">
                            <router-link :to="{ name: 'login' }" class="nav-link">

                                Đăng nhập
                            </router-link>
                        </li>

                        <li class="nav-item " v-if="nhanvien">
                            <router-link :to="{ name: 'employee' }" class="nav-link text-dark">
                                <i class="fa-regular fa-address-card"></i>
                                Nhân viên: {{ nhanvien.hotennv }}
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="nhanvien">
                            <button @click="logout" class="nav-link btn btn-link">
                                <i class="fa-solid fa-door-open"></i>
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>

</template>

<script>
export default {
    data() {
        return {
            nhanvien: null 
        };
    },
    created() {
        const staffJson = sessionStorage.getItem("nhanvien");
        this.nhanvien = JSON.parse(staffJson); 
    },
    methods: {
        logout() {
            sessionStorage.removeItem("nhanvien");
            window.location.reload();
        }
    }
};
</script>