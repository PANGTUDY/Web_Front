<template>
  <v-app id="app">
    <router-view name="header"></router-view>
    <v-main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </v-main>
    <!-- <chat
      :open="open"
      @closeit="open = false"
      @openit="open = true"
      :userInfo="userInfo"
    /> -->
    <router-view name="footer"></router-view>
    <confirm-popup></confirm-popup>
  </v-app>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
// import chat from "@/views/components/chat/Chat.vue";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import confirmPopup from "@/components/modal/confirmPopup.vue";
export default {
  components: {
    FadeTransition,
    // chat,
    confirmPopup,
  },
  data: () => ({
    open: false,
    message: "",
    openPopup: false,
  }),
  watch: {
    access() {
      if (!_.isEmpty(this.access)) {
        this.setTimeOut();
      } else {
        if (this.isLogin === true) {
          this.reissue();
        } else if (this.isLogin === false) {
          this.stopTimer();
        }
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo", "getToken"]),
    ...mapState({
      isLogin: ({ isLogin }) => isLogin,
      accessToken: ({ accessToken }) => accessToken,
      refreshToken: ({ refreshToken }) => refreshToken,
      timeout: ({ timeout }) => timeout,
      user: ({ user }) => user,
      refreshTimeOut: ({ refreshTimeOut }) => refreshTimeOut,
      authInfo: ({ authInfo }) => authInfo,
    }),
    access: {
      get() {
        return this.accessToken;
      },
    },
    refresh: {
      get() {
        return this.refreshToken;
      },
    },
  },
  methods: {
    ...mapActions(["reissueToken"]),
    ...mapMutations(["setValue", "logout"]),
    setTimeOut() {
      console.log("시간 설정");
      const today = new Date();
      const curTime = today.getTime();

      const loginOut = new Date(this.refreshTimeOut * 1000);
      const outTime = loginOut.getTime();

      let exitTime = sessionStorage.timeout
        ? sessionStorage.timeout
        : (this.timeout * 1000 - Date.now()) / 1000;
      this.interval = setInterval(() => {
        this.setTimer(exitTime);
        exitTime = exitTime - 1;

        if (curTime - outTime >= 0) {
          this.logout();
          sessionStorage.removeItem("timeout");
          this.stopTimer();
        }
        if (Math.floor(exitTime) === 0) {
          this.setValue({ accessToken: "" });
          sessionStorage.removeItem("timeout");
          this.stopTimer();
        }
      }, 1000);
    },
    reissue() {
      this.reissueToken(this.refreshToken).then(result => {
        if (result.status === "error") {
          this.message = result.message;
          this.openPopup = true;
        }
      });
    },
    setTimer(val) {
      sessionStorage.timeout = val;
    },
    stopTimer() {
      console.log("이게 호출되기는하니");
      clearInterval(this.interval);
      this.interval = null;
      sessionStorage.removeItem("timeout");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style>
.v-application .info {
  background-color: none !important;
  border-color: none;
}
</style>
