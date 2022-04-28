<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-primary">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 custom-card"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/github.svg" />
                  Github
                </base-button>

                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/google.svg" />
                  Google
                </base-button>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <base-input
                alternative
                class="mb-3"
                name="email"
                v-model="email"
                addon-left-icon="ni ni-email-83"
              >
              </base-input>
              <base-input
                alternative
                type="password"
                name="password"
                v-model="password"
                addon-left-icon="ni ni-lock-circle-open"
              >
              </base-input>

              <base-checkbox v-model="isChecked"> Remember me </base-checkbox>
              <div class="aler-danger">
                <p></p>
              </div>
              <div class="text-center">
                <base-button
                  btn_type="primary"
                  class="my-4"
                  type="submit"
                  @click="getUser"
                  >login</base-button
                >
              </div>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a class="text-light"
                ><router-link to="/register">
                  <small>Create new account</small>
                </router-link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirm-popup
      :popupSetting="popupSetting"
      @settingFalse="checkPopup($event)"
      :popMsg="popMsg"
      :menuType="menuType"
    ></confirm-popup>
  </section>
</template>
<script>
import confirmPopup from "./mixin/confirmPopup.vue";
import validator from "./mixin/validator";
import directives from "./mixin/myDirectives";
import { mapState, mapActions } from "vuex";
import VueCookies from "vue-cookies";

export default {
  components: {
    directives,
    confirmPopup,
  },
  data: () => ({
    email: "",
    password: "",
    popupSetting: false,
    popMsg: "로그인이 완료되었습니다.",
    menuType: "login",
    isChecked: false,
  }),
  computed: {
    ...mapState({
      accessToken: ({ accessToken }) => accessToken,
      refreshToken: ({ refreshToken }) => refreshToken,
      timeout: ({ timeout }) => timeout,
    }),
  },
  created() {
    // 쿠키에 값이 있다면 email 폼에 값을 넣어주기 + isChecked 체크표시로 만들기
    if (!_.isEmpty(VueCookies.get("email"))) {
      this.email = VueCookies.get("email");
      this.isChecked = true;
    }
  },
  watch: {
    isChecked() {
      // isChecked가 false로 바뀔 시에 쿠키에서 이메일 제거
      if (this.isChecked === false) {
        VueCookies.remove("email");
      }
    },
  },
  methods: {
    ...mapActions(["login"]),
    getUser() {
      // 로그인시 isChecked가 true 라면 쿠키에 이메일 값 넣어주기 / 유효기간으 7일
      if (this.isChecked === true) {
        VueCookies.set("email", this.email, "7d");
      }
      this.login({
        email: this.email,
        password: this.password,
      }).then((result) => {
        if (result === undefined) {
          this.popupSetting = true;
        }
      });
    },
    async checkPopup($event) {
      this.popupSetting = $event;
      await this.$router.push({ path: "/" });
      return this.popupSetting;
    },
  },
};
</script>
<style>
.alert-danger p {
  color: red;
}
.error {
  color: red;
}
</style>
