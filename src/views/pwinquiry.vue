<template>
  <div>
    <template>
      <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
          <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
        <section class="section section-skew">
          <div class="container">
            <card shadow class="card-profile mt--300" no-body>
              <div class="px-4">
                <div class="row justify-content-center">
                  <div class="col-lg-3 order-lg-2"></div>
                  <div
                    class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
                  >
                    <div class="card-profile-actions py-4 mt-lg-0"></div>
                  </div>
                  <div class="col-lg-4 order-lg-1">
                    <div
                      class="card-profile-stats d-flex justify-content-center"
                    ></div>
                  </div>
                </div>
                <div class="text-center mt-5">
                  <div class="h6 font-weight-300"></div>
                  <div class="h6 font-weight-300">
                    <label
                      class="ni ni-lock-circle-open custom-password"
                      for="confirm_password"
                      >현재 password</label
                    >
                    <div class="custom-layout">
                      <base-input
                        alternative
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        v-model="password"
                        name="password"
                      >
                      </base-input>
                    </div>
                    <label
                      class="ni ni-lock-circle-open custom-password"
                      for="confirm_password"
                      >새로운 password</label
                    >
                    <div class="custom-layout">
                      <base-input
                        alternative
                        type="password"
                        v-model="newPassword"
                        placeholder="비밀번호는 6~16자리로 숫자,영문,특수문자 혼합입니다."
                        addon-left-icon="ni ni-lock-circle-open"
                        name="password"
                        @blur.stop="validationCheck('newPassword')"
                      >
                      </base-input>
                    </div>
                    <label class="fa fa-check custom-password" for="password"
                      >새로운 password 확인</label
                    >
                    <div class="custom-layout">
                      <base-input
                        alternative
                        type="password"
                        v-model="confirm_newPassword"
                        placeholder="Password 재확인"
                        addon-left-icon="ni ni-lock-circle-open"
                      >
                      </base-input>
                    </div>
                    <div class="text-muted font-italic">
                      <small
                        >password strength:
                        <span class="font-weight-700" :class="changeStrength">{{
                          passwordValidation
                        }}</span>
                        <p>{{ msg }}</p>
                      </small>
                    </div>
                  </div>
                </div>
                <div class="mt-5 py-5 border-top text-center">
                  <div class="row justify-content-center">
                    <div class="col-lg-9">
                      <base-button
                        btn-type="info"
                        size="sm"
                        class="mr-4"
                        type="submit"
                        @click.stop="changeUserInfo"
                        >수정</base-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </card>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";


export default {
  data() {
    return {
      newPassword: "",
      confirm_newPassword: "",
      password: "",
      passwordValidation: "",
      msg: "",
      popupSetting: false,
      popMsg: "비밀번호 수정이 완료되었습니다.",
      menuType: "pwinquiry",
    };
  },
  methods: {
    ...mapActions(["modifyUser"]),
    validationCheck(type) {
      if (type == "newPassword") {
        if (_.isEmpty(this.newPassword)) {
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
    changeUserInfo() {
      if (
        _.isEmpty(this.newPassword) ||
        _.isEmpty(this.password) ||
        _.isEmpty(this.confirm_newPassword)
      ) {
        alert("입력해야할 필수 항목을 모두 입력해주세요");
      }
      if (
        !_.isEmpty(this.newPassword) &&
        !_.isEmpty(this.password) &&
        !_.isEmpty(this.confirm_newPassword)
      ) {
        let token = this.accessToken;
        let params = {
          email: this.authEmailInfo,
          password: this.newPassword,
          accessToken: token,
          name: this.userInfo.name,
        };
        this.modifyUser(params).then(result => {
          if (result) {
            this.alert(result.message);
          }
        });
      }
    },
  },
  watch: {
    newPassword() {
      if (this.newPassword.match(this.password)) {
        alert("현재 비밀번호과 수정할 비밀번호가 일치합니다.");
      }
      //숫자6자리
      let weak = /^[0-9]{1,5}$/g;
      if (this.newPassword.match(weak) != null) {
        this.passwordValidation = "weak";
      }
      // 영어 소문자,대문자,숫자 모두6자리
      let medium = /^\w{6}$/;
      if (this.newPassword.match(medium) != null) {
        this.passwordValidation = "medium";
      }
      let strong = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;
      if (this.newPassword.match(strong) != null) {
        this.passwordValidation = "strong";
      }
    },
    confirm_newPassword() {
      if (this.confirm_newPassword.match(this.newPassword) != null) {
        this.msg = "비밀번호가 일치합니다.";
      } else {
        this.msg = "비밀번호가 일치하지 않습니다.";
      }
    },
  },
  computed: {
    ...mapState({
      accessToken: ({ accessToken }) => accessToken,
      authEmailInfo: ({ authEmailInfo }) => authEmailInfo,
      user: ({ user }) => user,
    }),
    ...mapGetters(["userInfo"]),
    changeStrength() {
      return this.passwordValidation === "strong"
        ? "text-success"
        : "text-warning";
    },
  },
};
</script>
<style>
.reset {
  margin-left: 220px;
  margin-top: 100px;
}
.width_heywon {
  width: 10%;
}
.together_heywon {
  display: flex;
  justify-content: center;
}
.relocation_heywon {
  margin-top: 12px;
  margin-right: 0px;
}
.file-input {
  margin-left: 50px;
  margin-top: 0px;
  position: absolute;
}
.image-upload {
  position: relative;
}
.hide {
  display: none;
}
.custom-layout {
  width: 40%;
  position: relative;
  left: 30%;
}
.custom-password {
  margin-left: -600px;
}
</style>
