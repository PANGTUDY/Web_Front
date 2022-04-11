/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import store from "./user_store/index";
import lodash from 'lodash';
import ko from "vee-validate/dist/locale/ko.js";
import VeeValidate from "vee-validate";
import VueCookies from 'vue-cookies';
import vuetify from './plugins/vuetify'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import './registerServiceWorker';
import 'element-ui/lib/theme-chalk/index.css';




// veevalidate 설치 
const config = {
  locale:'ko',
  dicitionary:{
    ko
  }
}

const dictionary = {
  ko: {
    attributes: {
      passoword:'비밀번호'
    }
  }
}

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(VeeValidate, config);
Vue.use(ElementUI, { locale });
Vue.use(VueCookies)


new Vue({
  router,
  store,
  lodash,
  vuetify,
  render: h => h(App)
}).$mount("#app");

