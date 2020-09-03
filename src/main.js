import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "./plugins/ant-design-vue.js";

Vue.config.productionTip = false;

Vue.filter("formatDate", function(value) {
  if (!value) return "";
  return moment(value.toString()).format("MM/DD/YYYY hh:mm");
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
