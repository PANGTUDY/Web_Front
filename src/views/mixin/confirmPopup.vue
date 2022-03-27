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
          회원가입이 완료되었습니다.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <template v-if="this.$route.name == 'register'">
          
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
            @click="$emit('settingFalse',false)"
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
export default {
  props:{
    popupSetting: Boolean
  },
  data:()=>({
    dialog:''
  }),
  computed:{
    usingPopup(){
      return this.popupSetting;
    }
  }  
};
</script>

<style>

</style>