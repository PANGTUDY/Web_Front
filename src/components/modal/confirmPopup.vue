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
          <div
            text
            color="green darken-1"
            id="button"
            @click="closePopup(false)"
          >
            확인
          </div>
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
    closePopup(val) {
      this.close(val);
      this.isOpen = val;
      if (this.$route.name === "login") {
        return;
      }
      this.$router.push({ path: "/" });
    },
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        this.$emit("settingTrue", true);
      }
      if (e.key === "Enter") {
        this.$emit("settingTrue", true);
      }
    });
  },
};
</script>

<style></style>
