<template>
  <header class="header-global">
    <div style="position: relative">
      <base-nav type="honeydew" effect="light" expand>
        <img
          src="../../public/img/icons/common/pangtudy_logo.jpg.png"
          width="40px"
          height="40px"
        />
        <a class="navbar-brand fa-2x custom-fa" @click="goTo('')">Pangtudy</a>

        <div class="row" slot="content-header" slot-scope="{ closeMenu }">
          <div class="col-6 collapse-brand">
            <img src="../../public/img/icons/common/pangtudy.jpg" />
          </div>
          <div class="col-6 collapse-close">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto flex custom-flex">
          <li class="nav-item" v-for="menu in menuList" :key="menu.path">
            <a
              class="nav-link nav-link-icon"
              @click="goTo(menu.path), changeMenu(menu.path)"
              :class="selectedMenu === menu.path ? 'on' : ''"
            >
              <template v-if="isLogin === true && menu.loginRequire === true"
                >{{ menu.name }}
              </template>
              <template v-else-if="isLogin === false">
                {{ menu.name }}
              </template>
            </a>
          </li>

          <base-dropdown tag="li" title="settings">
            <a
              class="dropdown-item"
              v-for="(sub, i) in subList"
              :key="i"
              @click="goTo(sub.path)"
            >
              {{ sub.name }}
            </a>
          </base-dropdown>
          <div class="header-left" v-if="authInfo">{{ authInfo.name }}님</div>
          <div class="left_menu">
            <li class="nav-item" v-if="!isLogin">
              <a @click="goTo('login')">Login</a>
              <!-- <a class="nav-link nav-link-icon" @click="goTo('login')">Login</a> -->
            </li>
            <!-- <li class="nav-item" v-if="!isLogin">
            <a class="nav-link nav-link-icon" @click="goTo('register')">Register</a>
          </li> -->
            <li class="nav-item" v-else>
              <a @click.stop="memberClear">Logout</a>
            </li>
          </div>
        </ul>
      </base-nav>
    </div>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import { authComputed } from "../store/helper.js";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      person: {
        src: require("../../public/img/icons/common/happy.png"),
      },
      menuList: [
        // {name:'Login', path:'login'},
        { name: "Register", path: "register", loginRequire: false },
        { name: "Profile", path: "profile", loginRequire: true },
        { name: "Calendar", path: "calendar", loginRequire: true },
        { name: "Board", path: "board/list", loginRequire: true },
      ],
      subList: [
        { name: "권한관리", path: "grant", loginRequire: true },
        { name: "설정", path: "setting", loginRequire: true },
      ],
      menuType: "all",
      message: "",
      openPopup: false,
      selectedMenu: "",
    };
  },
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
  computed: {
    ...authComputed,
    ...mapGetters["userInfo"],
    ...mapState({
      isLogin: ({ isLogin }) => isLogin,
      refreshToken: ({ refreshToken }) => refreshToken,
      popupSetting: ({ popupSetting }) => popupSetting,
      authInfo: ({ authInfo }) => authInfo,
    }),
  },
  methods: {
    ...mapActions(["logout"]),
    ...mapMutations(["setValue"]),
    memberClear() {
      this.logout({
        refreshToken: this.refreshToken,
      }).then(result => {
        console.log("result", result);
        if (result.status === "error") {
          this.message = result.message;
          this.openPopup = true;
        } else {
          if (result.status === "success") {
            this.message = "로그아웃이 완료되었습니다.";
            this.openPopup = true;
          }
        }
      });
    },
    changeMenu(path) {
      this.selectedMenu = path;
    },
    closePopup(val) {
      console.log("타니");
      if (this.message.includes("로그아웃") === false) {
        this.openPopup = val;
      } else if (this.message.includes("로그아웃") === true) {
        this.openPopup = val;
        if (this.openPopup === false) {
          this.$router.push({ path: "/login" });
        }
      }
    },
    // 원하는 화면으로 이동시기키
    goTo(path) {
      console.log("path", path);
      if (path !== this.$route.name) {
        this.$router.push("/" + path);
      }
      if (_.isEmpty(this.authInfo)) {
        this.setValue({ movePath: path });
      }
    },
  },
};
</script>
<style scoped>
li {
  display: flex;
}

/* 수정보완필요 */
</style>
