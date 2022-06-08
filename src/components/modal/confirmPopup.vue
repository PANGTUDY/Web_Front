<template>
  <article class="popup" v-if="isPop">
    <div class="wrap">
      <button type="button"></button>
      <div class="boxBody">
        <h5>알림</h5>
        <p v-html="isMsg"></p>
        <div>
          <button type="button">확인</button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import { alertPopup } from "@/mixins/alertPopup.js";
export default {
  mixins: [alertPopup],
  computed: {
    ...mapGetters({
      isPop: ({ isPop }) => isPop,
      isMsg: ({ isMsg }) => isMsg,
    }),
  },
};
</script>

<style></style>
