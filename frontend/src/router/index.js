import Book from "@/views/Book/Book.vue";
import Employee from "@/views/Staff/Employee.vue";
import Publisher from "@/views/Publisher/Publisher.vue";
import Reader from "@/views/Reader/Reader.vue";
import Trade from "@/views/Trade/Trade.vue";
import Login from "@/views/Login.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/",
        name: "book",
        component: Book,
    },
    {
        path: "/",
        name: "publisher",
        component: Publisher,
    },
    {
        path: "/",
        name: "employee",
        component: Employee,
    },
    {
        path: "/",
        name: "reader",
        component: Reader,
    },
    {
        path: "/",
        name: "trade",
        component: Trade,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/sach/:id",
        name: "book.edit",
        component: () => import("@/views/Book/BookEdit.vue"),
        props: true
    },
    {
        path: "/sach",
        name: "book.add",
        component: () => import("@/views/Book/BookAdd.vue"),
        props: true
    },
    {
        path: "/nhaxuatban/:id",
        name: "publisher.edit",
        component: () => import("@/views/Publisher/PublisherEdit.vue"),
        props: true
    },
    {
        path: "/nhaxuatban",
        name: "publisher.add",
        component: () => import("@/views/Publisher/PublisherAdd.vue"),
        props: true
    },
    {
        path: "/docgia/:id",
        name: "reader.edit",
        component: () => import("@/views/Reader/ReaderEdit.vue"),
        props: true
    },
    {
        path: "/docgia",
        name: "reader.add",
        component: () => import("@/views/Reader/ReaderAdd.vue"),
        props: true
    },
    {
        path: "/nhanvien/:id",
        name: "employee.edit",
        component: () => import("@/views/Staff/EmployeeEdit.vue"),
        props: true
    },
    {
        path: "/nhanvien",
        name: "employee.add",
        component: () => import("@/views/Staff/EmployeeAdd.vue"),
        props: true
    },
    {
        path: "/muonsach/:id",
        name: "trade.edit",
        component: () => import("@/views/Trade/TradeEdit.vue"),
        props: true
    },
    {
        path: "/muonsach",
        name: "trade.add",
        component: () => import("@/views/Trade/TradeAdd.vue"),
        props: true
    },


];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;