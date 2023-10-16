import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import vueCookies from "vue-cookies";

loadFonts();

createApp(App).use(router).use(vuetify).use(vueCookies).mount("#app");
