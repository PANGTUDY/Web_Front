<template>
  <v-row justify="center" v-if="usingPopup == true">
    <!-- <v-btn
      color="primary"
      dark
      @click.stop="$emit('settingFalse', false)"
    >
      Open Dialog
    </v-btn> -->

    <v-dialog
      v-model="usingPopup"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          <!-- 회원가입을 진행하시겠습니까? -->
        </v-card-title>

       
        <v-card-text>
         {{popMsg}}
        </v-card-text>
       
        <v-card-actions>
          <v-spacer></v-spacer>
          <template v-if="this.key === 'register'">
          
          <v-btn
            color="green darken-1"
            text
            @click="$emit('settingFalse',false)"
          >
            확인
          </v-btn>
          </template>
           <template v-else>
          <v-btn
            color="green darken-1"
            text
            @click="$emit('settingFalse',false)"
          >
          취소
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="$emit('settingTrue',false)"
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
import {mapState} from 'vuex';
export default {
  props:{
    popupSetting: Boolean,
    popMsg:String,
    key:String
  },
  data:()=>({
    dialog:''
  }),
  computed:{
    ...mapState({
      isLogin: ({isLogin}) => isLogin
    }),
    usingPopup(){
      return this.popupSetting;
    }
  }  
};
</script>

<style>

</style>