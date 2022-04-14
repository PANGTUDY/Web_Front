<template>
<v-app>
  <v-content>
  <div>
      <v-banner single-line>권한 관리</v-banner>
      <v-row>
      <v-tabs>
    <v-tab>전체</v-tab>
    <v-tab>관리자</v-tab>
    <v-tab>이용자</v-tab>
    
  </v-tabs>
      </v-row>
      <v-row>
     <v-col
        class="d-flex"
        cols="6"
        sm="2"
      >
        <v-select
          :items="menus"
          label="권한수정"
          item-text="admin"
          item-value="admin"
          outlined
        ></v-select>
        </v-col>
        <v-btn
      depressed
      color="primary">
      변경
    </v-btn>
     <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            
            outlined
          ></v-text-field>
        </v-col>
          <v-btn
      depressed
      color="primary">
      사용자 검색
    </v-btn>
      </v-row>
    <template>
  <v-row align="center">    
  <v-simple-table style="width:90%">
    <template v-slot:default>
      <thead>
        <tr class="custom-background">
        <th>
            <input type="checkbox">
        </th>    
          <th class="text-left">
           이름
          </th>
          <th class="text-left">
              이메일
          </th>
          <th>
              권한
          </th>    
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(member,index) in allUsers"
          :key="index"
        >
          <td><input type="checkbox"></td>
          <td>{{ member.name }}</td>
          <td>{{ member.email }}</td>
          <td>{{member.role}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-row>
    </template>
  </div>
  </v-content>
</v-app>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import VueCookies from 'vue-cookies';
export default {
    data(){
        return{
            items:[
                {name:'User1', email:'user1@gmail.com',admin:'관리자'},
                {name:'User2', email:'user2@gmail.com',admin:'사용자'},
                {name:'User3', email:'user3@gmail.com',admin:'사용자'}
            ],
            menus:[{admin:'관리자'},{admin:'사용자'}],
        }
    },
    computed:{
        ...mapState({
          accessToken: ({accessToken}) => accessToken,
          allUsers: ({allUsers})=> allUsers
        })
    },
    created(){
      let token = this.accessToken;
      // let token = VueCookies.get('accessToken');
      this.allMembers(token);
    },
    methods:{
      ...mapActions(['allMembers'])


    }

}
</script>

<style>
.row + .row {
    margin-top: 65px;
    margin-bottom: -99px;
}
.custom-background{
    background:#dadada;

}
.custom-primary{
    background-color:#2b22b2;
}
.v-data-table__wrapper {
    position: relative;
    left: 6%;
    margin-top: 5%;
}
button.v-btn.v-btn--has-bg.theme--light.v-size--default.primary {
    position: relative;
    margin-top: 18px;
    height: 40px;
}
.v-text-field fieldset, .v-text-field .v-input__control {
    color: currentColor;
    height: max-content;
}
button.v-btn.v-btn--has-bg.theme--light.v-size--default.primary {
    position: relative;
    margin-top: 13px;
    /* margin-left: -56px; */
    height: 40px;
}
.theme--light.v-input {
    color: rgba(0, 0, 0, 0.87);
    margin-left: 70px;
}
@media (min-width: 768px){
.col-md-3 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
    float: right;
    margin-left: 37%;
}
}
.v-application .d-flex {
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
    margin-left: 71px;
}
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0 12px;
    /* width: 180px; */
}
.v-slide-group__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    position: relative;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    white-space: nowrap;
    margin-left: 85px;
    /* margin-top: -2px; */
}
.theme--light.v-tabs > .v-tabs-bar {
    background-color: #FFFFFF;
    margin-top: 50px;
    margin-bottom: -47px;
}
.v-banner--single-line .v-banner__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 45px;
    margin-bottom: 7px;
    font-size: 20px;
    margin-top: 10px;
}
</style>