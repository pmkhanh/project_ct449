<script>
import AppHeader from "@/components/AppHeader.vue";
import Login from "./views/Login.vue";
export default {
  components: {
    AppHeader,
    Login
  },
  data() {
    return {
      nhanvien: null 
    };
  },
  created() {
    const staffJson = sessionStorage.getItem("nhanvien");
    this.nhanvien = JSON.parse(staffJson);
  },

};
</script>
<template>
  <div id="app">
    <div v-if="!nhanvien" class="container mt-5 bg-secondary p-3 bg-gradient bg-opacity-25">
      <login />

    </div>
    <div v-if="nhanvien">
      <AppHeader />
      <div class="container mt-3 bg-secondary p-3 bg-gradient bg-opacity-25">

          <router-view />
      </div>
    </div>
  </div>
</template>
