<template>
<div class="container">
  <div class="row">
    <div class="col-lg-4">
      <h3 class="h4 text-success font-weight-bold mt-md mb-4">Datepicker</h3>
      <DatePickers></DatePickers>
    </div>
    <div class="col-lg-4">
      <h3 class="h4 text-success font-weight-bold mt-md mb-4">Datepicker</h3>
      <DatePickers></DatePickers>
    </div>
    <div class="col-lg-4">
      <h3 class="h4 text-success font-weight-bold mt-md mb-4">Datepicker</h3>
      <DatePickers></DatePickers>
    </div>
  </div>
</div>
</template>

<script>
  import Vue from 'vue'
  const DatePickers = () => import("./components/JavascriptComponents/DatePickers")
  import Modals from "./components/JavascriptComponents/Modals"

  export default {
    components: {
      DatePickers,
      Modals
    }
  }
</script>

<style scoped>

</style>