<template>
  <v-row justify="center" v-if="isOpen == true" id="pop">
    <v-dialog v-model="isOpen" @keydown.esc="isOpen = false" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> </v-card-title>

        <v-card-text>
          {{ alertMsg }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <template v-if="alertMsg.includes('로그인')">
            <v-btn
              ref="btn"
              color="green darken-1"
              text
              @click="closePopup(false)"
            >
              확인
            </v-btn>

            <v-btn color="green darken-1" text @click="cancelMove(false)">
              취소
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              ref="btn"
              color="green darken-1"
              text
              @click="cancelMove(false)"
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
import { mapGetters, mapState } from "vuex";
import { alertPopup } from "@/mixins/alertPopup.js";

export default {
  data: () => ({
    isShow: "",
  }),
  mixins: [alertPopup],
  computed: {
    ...mapState({
      alertMsg: ({ alertMsg }) => alertMsg,
      isPopupShow: ({ isPopupShow }) => isPopupShow,
    }),
    isOpen: {
      get() {
        return this.isPopupShow;
      },
      set(val) {
        return val;
      },
    },
  },
  methods: {
    // 팝업 닫고 로그인 화면으로 이동
    closePopup(val) {
      this.close(val);
      // this.isOpen = val;
     
        if (this.$route.name === "login") {
          return;
        } else {
          this.$router.push({ path: "/login" });
        }
      
    },
    // 로그인 이동 취소 시 해당 화면에 머물러 있기
    cancelMove(val) {
      this.close(val);
      // this.isOpen = val;
      return;
    },
  },
  mounted() {
    // esc,enter 누르면 팝업창 닫히는 이슈 => esc,enter에도 팝업창이 닫히도록 설정
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        this.alertAlarm({ isPopupShow: false });
      }
      if (e.key === "Enter") {
        this.alertAlarm({ isPopupShow: false });
      }
    });
  },
};
</script>

<style></style>
