import Vue, { VNode } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Buefy from "buefy";
import "buefy/dist/buefy.min.css";

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
	render: (h): VNode => h(App),
}).$mount("#app");
