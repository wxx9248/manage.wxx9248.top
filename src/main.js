import {createApp} from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@/assets/css/global.css";

createApp(App)
    .use(vuetify)
    .mount("#app");
