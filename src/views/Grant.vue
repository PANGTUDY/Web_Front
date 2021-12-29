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
            label="Outlined"
            placeholder="Placeholder"
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
          v-for="(item,i) in items"
          :key="i"
        >
          <td><input type="checkbox"></td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{item.admin}}</td>
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
    }

}
</script>

<style>
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
</style>