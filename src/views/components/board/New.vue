<template>
  <v-app>
    <TipTap
      :options="options"
    />
  </v-app>
</template>

<script>
import TipTap from '@/components/TipTap'
export default {
  components: {
    TipTap
  },
  data () {
    return {
      options: {
        content: '',
        editable: true,
      }
    }
  }
}
</script>