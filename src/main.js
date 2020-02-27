import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faTwitter, faGlobe);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Vue Select
import vSelect from "vue-select";
Vue.component("v-select", vSelect);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
