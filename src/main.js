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
import store from "./user_store/store";
import lodash from 'lodash';
import VeeValidate from 'vee-validate';



Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(VeeValidate);


new Vue({
  router,
  store,
  created(){
    const userString = localStorage.getItem('user');
    if(userString){
        const userData = JSON.parse(userString);
        this.$store.commit('SET_USER_DATA',userData)
    }
   
  },
  lodash,
  render: h => h(App)
}).$mount("#app");

