<template>
  <v-footer padless>
    <v-col class="text-center" cols="12">
      &copy; {{ year }}
      <a href="https://github.com/PANGTUDY" target="_blank" rel="noopener"
        >Pangtudy</a
      >
    </v-col>
  </v-footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style>
</style>
