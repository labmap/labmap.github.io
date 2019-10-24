import Vue from "vue";
import ToggleButton from "vue-js-toggle-button";
import App from "./App.vue";

Vue.use(ToggleButton);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
