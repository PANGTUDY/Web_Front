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
import { mapGetters,mapState } from 'vuex';
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
  created(){
    // 메인 컴포넌트를 렌더링 하면서 토큰 체크
     let token = this.$store.getters.getToken;
     if(token.access == null && token.refresh == null){
       //현재 경로와 동일한 경로로 화면 이동 시 발생하는 예외 처리 코드
       this.$router.push({name:'login'}).catch(()=>{});
     }
  },
  computed:{
    ...mapGetters(['userInfo']),
    ...mapState({
            accessToken:({accessToken}) => accessToken,
            refreshToken:({refreshToken}) => refreshToken
        })
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