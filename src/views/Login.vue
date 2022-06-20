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
                @keyup.enter="getUser"
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
              <div class="setColor">
                {{ message }}
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
  </section>
</template>
<script>
import directives from "@/views/mixin/myDirectives";
import { mapState, mapActions } from "vuex";
import VueCookies from "vue-cookies";

export default {
  components: {},
  mixins: [directives],
  data: () => ({
    email: "",
    password: "",
    menuType: "login",
    message: "",
    isChecked: false,
    openPopup: false,
  }),
  computed: {
    ...mapState({
      accessToken: ({ accessToken }) => accessToken,
      refreshToken: ({ refreshToken }) => refreshToken,
      timeout: ({ timeout }) => timeout,
      user: ({ user }) => user,
      movePath: ({ movePath }) => movePath,
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
    ...mapActions(["login", "authEmail"]),
    initForm() {
      this.email = "";
      this.password = "";
    },
    async getUser() {
      // 로그인시 isChecked가 true 라면 쿠키에 이메일 값 넣어주기 / 유효기간은 7일
      if (this.isChecked === true) {
        VueCookies.set("email", this.email, "7d");
      }
      await this.login({
        email: this.email,
        password: this.password,
      }).then(result => {
        if (result.status === "error") {
          this.message = result.message;
          if (this.isChecked === false) {
            this.email = "";
          }
          this.password = "";
        } else {
          if (result.status === "success") {
            this.authEmail({
              accessToken: this.accessToken,
              id: this.user.id,
            });
            if (!_.isEmpty(this.movePath)) {
              this.$router.push({ path: "/" + this.movePath });
            } else {
              this.$router.push({ path: "/" });
            }
          }
        }
      });
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
