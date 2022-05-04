<template>
  <v-app id="app">
    <router-view name="header"></router-view>
    <v-main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </v-main>
    <chat
      :open="open"
      @closeit="open = false"
      @openit="open = true"
      :userInfo="userInfo"
    />
    <router-view name="footer"></router-view>
    <pop-up>
      <template v-slot:msg>
        {{message}}
      </template>
      <template v-slot:button>
            <v-btn
              color="green darken-1"
              text
              @click="closePopup(false)"
            >
              확인
            </v-btn>
      </template>
    </pop-up>
  </v-app>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import chat from "@/views/components/chat/Chat.vue";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import PopUp from './views/mixin/popUp.vue';
export default {
  components: {
    FadeTransition,
    chat,
    PopUp
  },
  data:()=>({
    open:false,
    message:'',
    openPopup: false
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
  created() {
    // // 메인 컴포넌트를 렌더링 하면서 토큰 체크
    //  let token = this.$store.getters.getToken;
    //  if(token.access == null && token.refresh == null){
    //    //현재 경로와 동일한 경로로 화면 이동 시 발생하는 예외 처리 코드
    //    this.$router.push({name:'login'}).catch(()=>{});
    //  }
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
        // console.log('timeout',exitTime);
        // console.log('refresh',this.refreshTimeOut);
        // console.log('cur', curTime);
        // console.log('값',curTime - outTime);
        // console.log('응',outTime - curTime);

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
      this.reissueToken(this.refreshToken).then((result) => {
        if(result.status === 'error'){
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