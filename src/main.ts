import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";
import { store, key } from "@/helper/store";

Axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;
const nhbApp = createApp(App);
nhbApp.use(store, key);
// nhbApp.provide("$store", store);
nhbApp.use(router);

nhbApp.mount("#app");
