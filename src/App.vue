<template>
  <v-app id="app">
    <router-view name="header"></router-view>
    <v-main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
     
    </v-main>
     <chat :open="open" @closeit="open = false" @openit="open = true" :userInfo="userInfo"/>
    <router-view name="footer"></router-view>
  </v-app>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import chat from '@/views/components/chat/Chat.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    FadeTransition,
    chat
  },
  data(){
      return{
          open: false,
      }
  },
  computed:{
    ...mapGetters(['userInfo'])
      
  },
  methods:{
      

  }
  
  
};
</script>
<style>
.v-application .info {
    background-color: none !important;
    border-color: none;
}
</style>