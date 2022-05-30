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
        <v-card-title class="text-h5"> </v-card-title>

        <v-card-text>
          <slot name="msg"> </slot>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="button"> </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { get } from "http";
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
