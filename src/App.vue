<template>
  <div id="app">
    <router-view name="header"></router-view>
    <v-main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </v-main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition,
  },
};
</script>
