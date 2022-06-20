<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
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
            class="border-0"
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
                <small>Or sign up with credentials</small>
              </div>
              <label class="ni ni-hat-3" for="name"> name</label>
              <base-input
                alternative
                class="mb-3"
                placeholder="name "
                v-model="name"
              >
              </base-input>
              <label class="ni ni-email-83" for="email"> email</label>
              <base-input
                alternative
                class="mb-3"
                placeholder="Email"
                v-model="email"
                @blur.stop="validationCheck('email')"
              >
              </base-input>
              <div>
                <base-button
                  btn_type="primary"
                  type="submit"
                  @click.stop="confirmEmail"
                  >이메일 인증</base-button
                >
              </div>
              <label class="fa fa-check" for="comfirm_email">
                confirm email</label
              >
              <span id="onlyemail">
                <base-input
                  alternative
                  class="mb-3 loose"
                  placeholder="Email 인증"
                >
                </base-input>
                <div>
                  <base-button btn_type="primary" class="reform" type="submit"
                    >인증번호 전송</base-button
                  >
                </div>
              </span>
              <label class="ni ni-lock-circle-open" for="confirm_password">
                password</label
              >
              <base-input
                alternative
                type="password"
                placeholder="비밀번호는 6~16자리로 숫자,영문,특수문자 혼합입니다. "
                addon-left-icon="ni ni-lock-circle-open"
                v-model="password"
                @blur.stop="validationCheck('password')"
              >
              </base-input>
              <label class="fa fa-check" for="password">confirm password</label>
              <base-input
                alternative
                type="password"
                v-model="password_confirm"
                placeholder="Password 재확인"
                addon-left-icon="ni ni-lock-circle-open"
              >
              </base-input>
              <div class="text-muted font-italic">
                <small
                  >password strength:
                  <span class="font-weight-700" :class="changeStrength">{{
                    passwordValidation
                  }}</span>
                  <p>{{ msg }}</p>
                </small>
              </div>
              <!-- <base-checkbox>
                                    <span>I agree with the
                                        <a href="#">Privacy Policy</a>
                                    </span>
                                </base-checkbox> -->
              <div class="text-center">
                <span class="text-success font-weight-700"
                  ><router-link to="/login"
                    >Already have an account? Login</router-link
                  ></span
                >
              </div>
              <div class="text-center">
                <base-button
                  btn_type="primary"
                  class="my-4"
                  type="submit"
                  @click.stop="registerInfo"
                  >Create account</base-button
                >
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      password: "",
      popupSetting: false,
      password_confirm: "",
      message: "",
      openPopup: false,
      email: "",
      registerMsg: [
        { name: "비밀번호가 일치하지 않습니다." },
        { name: "비밀번호가 일치합니다." },
      ],
      msg: "",
      passwordValidation: "",
      popMsg: "회원가입이 완료되었습니다.",
      menuType: "register",
    };
  },
  computed: {
    changeStrength: function () {
      return this.passwordValidation === "strong"
        ? "text-success"
        : "text-warning";
    },
  },
  watch: {
    password() {
      //숫자6자리
      let weak = /^[0-9]{1,5}$/g;
      if (this.password.match(weak) != null) {
        this.passwordValidation = "weak";
      }
      // 영어 소문자,대문자,숫자 모두6자리
      let medium = /^\w{6}$/;
      if (this.password.match(medium) != null) {
        this.passwordValidation = "medium";
      }
      let strong = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;
      if (this.password.match(strong) != null) {
        this.passwordValidation = "strong";
      }
    },
    password_confirm() {
      if (this.password_confirm.match(this.password) != null) {
        this.msg = "비밀번호가 일치합니다.";
      } else {
        this.msg = "비밀번호가 일치하지 않습니다.";
      }
    },
  },
  methods: {
    ...mapActions(["verifyEmail", "register"]),
    registerInfo() {
      if (
        _.isEmpty(this.password) ||
        _.isEmpty(this.email) ||
        _.isEmpty(this.password_confirm)
      ) {
        alert("입력해야할 항목을 모두 입력해주세요");
      }
      if (
        !_.isEmpty(this.password) &&
        !_.isEmpty(this.email) &&
        !_.isEmpty(this.password_confirm)
      ) {
        this.register({
          name: this.name,
          email: this.email,
          password: this.password,
        }).then(result => {
          if (result.status === "error") {
            this.message = result.message;
            this.alarm(this.message);
          } else {
            if (result.status === "success") {
              this.message = "회원가입이 완료되었습니다.";
              this.alarm(this.message);
            }
          }
        });
      }
    },
    confirmEmail() {
      this.verifyEmail({ email: this.email });
    },
    validationCheck(type) {
      if (type == "email") {
        if (_.isEmpty(this.email)) {
          alert("이메일을 입력해주세요");
          return false;
        } else {
          let regExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
          if (this.email.match(regExp) !== null) {
            return true;
          } else {
            alert("이메일을 올바르게 입력해주세요");
          }
        }
      } else if (type == "password") {
        if (_.isEmpty(this.password)) {
          alert("비밀번호를 입력해주세요");
          return false;
        } else {
          let regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;
          if (this.password.match(regExp) != null) {
            return true;
          } else {
            alert("비밀번호를 올바르게 입력해주세요");
          }
        }
      }
    },
  },
};
</script>
<style>
#onlyemail {
  display: flex;
  flex-wrap: wrap;
  height: 80%;
}
.loose {
  width: 70%;
  height: 40%;
}
.reform {
  margin-left: 10px;
  background-color: rgb(18, 17, 41);
  color: white;
}
</style>
