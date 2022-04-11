<template>
  <header class="header-global">
    <div style="position: relative">
      <base-nav type="honeydew" effect="light" expand>
      <img src="../../public/img/icons/common/pangtudy_logo.jpg.png" width="40px" height="40px"/>
        <a class="navbar-brand fa-2x" @click="goTo('')" style="font-weight: 400; margin-left: 0.5rem;">Pangtudy</a>

        <div class="row" slot="content-header" slot-scope="{ closeMenu }">
          <div class="col-6 collapse-brand">
            <img src="../../public/img/icons/common/pangtudy.jpg" />
          </div>
          <div class="col-6 collapse-close">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto flex">
          <li class="nav-item" v-for="menu in menuList" :key="menu.path">
            <a class="nav-link nav-link-icon" @click="goTo(menu.path)">{{menu.name}}</a>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <a class="nav-link nav-link-icon" @click="goTo('login')">Login</a>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <a class="nav-link nav-link-icon" @click="goTo('register')">Register</a>
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link nav-link-icon" @click.stop="logout">Logout</a>
          </li>
        
         <base-dropdown tag="li" title="settings">
          <a class="dropdown-item" v-for="(sub,i) in subList" :key="i" @click="goTo(sub.path)">
            {{sub.name}}
          </a>
         </base-dropdown>
         <div class="header-left" v-if="userInfo">
          {{userInfo.name}}님
         </div> 
        </ul>
        
      </base-nav>
      <confirm-popup :popupSetting="popupSetting" @settingFalse="checkPopup($event)" @settingTrue="moveTo($event)" :popMsg="popMsg" :menuType="menuType"></confirm-popup>
    </div>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import confirmPopup from "@/views/mixin/confirmPopup.vue";
import {authComputed} from "../user_store/helper.js";
import {mapGetters,mapState} from "vuex";
export default {
  data(){
    return {
      person:{
        src: require('../../public/img/icons/common/happy.png')
      },
      menuList:[
        // {name:'Login', path:'login'},
        {name:'Register', path:'register'},
        {name: 'Profile', path:'profile'},
        {name:'Calendar', path:'calendar'},
        {name:'Board', path:'board/list'}
      ],
      subList:[
        {name:'권한관리', path:'grant'},
        {name:'설정', path:'setting'},
        
      ],
      popupSetting: false,
      popMsg:'로그인이 필요한 화면입니다. 로그인하시겠습니까?',
      menuType:'all'
    }
  },
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    confirmPopup
  },
  computed:{
    ...authComputed,
    ...mapGetters['userInfo'],
    ...mapState({
      isLogin: ({isLogin}) => isLogin
    })
  },
  methods:{
    logout() {
      this.$store.dispatch('logout');
    },
    checkPopup($event) {
      this.popupSetting = $event;
      return this.popupSetting;
    },
    // 원하는 화면으로 이동시기키
    goTo(path) {
      // 로그인 되어있을때
      if (this.isLogin === true) {
        // path 로 화면을 전환한다.
        // 단, path와 현재 path가 같을 시에 이동시키지 않는다. 다를 경우만 이동
        if (path) {
          if (this.$route.path !== path) {
              this.$router.push('/'+path);
          }
        } else {
          this.$router.push('/');
        }
        // 로그인 되어있지 않을때
      } else if(this.isLogin === false) {
        if (path === '') {
          // 메인으로 이동하고자 하면 이동시킨다.
          this.$router.push('/');
        } else {
          this.popupSetting = true;
        }
      }
      
    },
    moveTo($event){
      this.popupSetting = $event;
      if(this.$route.name !== 'login'){
      this.$router.push({name:'login'});
      }
      return this.popupSetting;

    }
  }
};
</script>
<style scoped>
li{
  display:flex;
} 

/* 수정보완필요 */
</style>