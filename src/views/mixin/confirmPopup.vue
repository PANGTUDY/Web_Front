<template>
  <v-row justify="center" v-if="usingPopup == true">
    <!-- <v-btn
      color="primary"
      dark
      @click.stop="$emit('settingFalse', false)"
    >
      Open Dialog
    </v-btn> -->

    <v-dialog v-model="usingPopup" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          <!-- 회원가입을 진행하시겠습니까? -->
        </v-card-title>

        <v-card-text>
          {{ popMsg }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <template v-if="this.menuType === 'register'">
            <v-btn
              color="green darken-1"
              text
              @click="$emit('settingFalse', false)"
              @keydown.esc="$emit('settingFalse', false)"
              @keyup.enter="$emit('settingFalse', false)"
            >
              확인
            </v-btn>
          </template>
          <template v-else-if="this.menuType === 'login'">
            <v-btn
              color="green darken-1"
              text
              @click="$emit('settingFalse', false)"
              @keyup.enter="$emit('settingFalse', false)"
              @keydown.esc="$emit('settingFalse', false)"
            >
              확인
            </v-btn>
          </template>
          <template v-else-if="this.menuType === 'pwinquiry'">
            <v-btn
              color="green darken-1"
              text
              @click="$emit('settingFalse', false)"
            >
              확인
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              color="green darken-1"
              text
              @click="$emit('settingFalse', false)"
            >
              취소
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="$emit('settingTrue', false)"
            >
              확인
            </v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    popupSetting: Boolean,
    popMsg: String,
    menuType: String,
  },
  data: () => ({
    dialog: "",
  }),
  // mounted() {
  //   var modal = document.querySelector("v-btn");
  //   const vm = this;
  //   console.log("modal", modal);
  //   window.addEventListener("keydown", function (e) {
  //     if (e.key === "Escape") {
  //       vm.$emit("settingTrue", true);
  //     }
  //     if (e.key === "Enter") {
  //       vm.$emit("settingTrue", true);
  //       console.log("this.pop", this.popupSetting);
  //     }
  //   });
  // },
  computed: {
    ...mapState({
      isLogin: ({ isLogin }) => isLogin,
    }),
    usingPopup: {
      get() {
        return this.popupSetting;
      },
      set() {},
    },
  },
};
</script>

<style></style>
