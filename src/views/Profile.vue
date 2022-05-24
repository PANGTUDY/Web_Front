<template>
  <div>
    <template>
      <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
          <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
        <section class="section section-skew">
          <div class="container">
            <card shadow class="card-profile mt--300" no-body>
              <div class="px-4">
                <div class="row justify-content-center">
                  <div class="col-lg-3 order-lg-2">
                    <div class="card-profile-image">
                      <a href="#">
                        <img
                          v-if="person.src"
                          :src="person.src"
                          class="rounded-circle"
                        />
                        <img
                          v-else
                          src="../../public/img/icons/common/account.png"
                          class="rounded-circle"
                        />

                        <div class="image-upload">
                          <div class="file-input">
                            <label for="mainImage">
                              <base-button
                                type="info"
                                size="sm"
                                class="mr-4 reset"
                                ><i
                                  class="fa fa-plus-square"
                                  aria-hidden="true"
                                ></i
                              ></base-button>
                            </label>
                            <input
                              type="file"
                              style="display: none"
                              ref="memberImage"
                              id="mainImage"
                              accept="image/*"
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    class="
                      col-lg-4
                      order-lg-3
                      text-lg-right
                      align-self-lg-center
                    "
                  >
                    <div class="card-profile-actions py-4 mt-lg-0">
                      <base-button type="info" size="sm" class="mr-4"
                        >Connect</base-button
                      >
                      <base-button type="default" size="sm" class="float-right"
                        >Message</base-button
                      >
                    </div>
                  </div>
                  <div class="col-lg-4 order-lg-1">
                    <div
                      class="card-profile-stats d-flex justify-content-center"
                    ></div>
                  </div>
                </div>
                <div class="text-center mt-5">
                  <div class="h6 font-weight-300 custom-heywon">
                    <label class="relocation_heywon" for="email"
                      >email:{{ authInfo.email }}</label
                    >
                  </div>
                  <div class="h6 font-weight-300">
                    <label class="relocation_heywon" for="email"
                      >password:</label
                    >
                    <base-button
                      type="info"
                      size="sm"
                      class="mr-4"
                      @click="pageMove"
                      >비밀번호 변경</base-button
                    >
                  </div>
                  <div class="together_heywon">
                    <label class="relocation_heywon" for="name"> name</label>
                    <base-input alternative class="width_heywon"> </base-input>
                  </div>
                  <!-- <div class="together_heywon">
                                <label class="relocation_heywon" for="name"> 상태메시지</label>
                                <base-input alternative
                                            class="width_heywon"
                                            
                                            v-model="title"
                                            @change="func">
                                            
                                </base-input>
                            </div> -->
                </div>
                <div class="mt-5 py-5 border-top text-center">
                  <div class="row justify-content-center">
                    <div class="col-lg-9">
                      <base-button
                        type="info"
                        size="sm"
                        class="mr-4"
                        @click="memberReset()"
                        >회원탈퇴</base-button
                      >
                      <base-button
                        type="info"
                        size="sm"
                        class="mr-4"
                        v-on:click="subumit()"
                        >저장</base-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </card>
          </div>
        </section>
      </div>
    </template>
    <pop-up>
      <template v-slot:msg>
        {{message}}
      </template>
      <template v-slot:button>
          <v-btn
              color="green darken-1"
              text
              @click="closePopup(false)"
            >
              확인
            </v-btn>
      </template>
    </pop-up>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
import popUp from '../views/mixin/popUp.vue'

export default {
  components:{
    popUp
  },
  data() {
    return {
      person: {
        name: "",
        title: "",
        src: require("../../public/img/icons/common/happy.png"),
      },

      mainImage: "",
      name: "",
      event: "",
      title: "",
    };
  },
  computed: {
    ...mapState({
      authInfo: ({ authInfo }) => authInfo,
      accessToken: ({ accessToken }) => accessToken,
      user: ({user}) => user
    }),
  },
  created() {
    let token = this.accessToken;
    // let token = VueCookies.get('accessToken');
    let params = {
      accessToken: token,
      id:this.user.id
    };
    
    this.authEmail(params).then(result => console.log(result));
  },
  methods: {
    ...mapActions(["authEmail", "leftMember"]),
    ...mapMutations(["logout"]),
    closePopup(val){
      if(this.message.includes('회원탈퇴') === false){
        this.openPoup = val;
      }else if(this.message.includes('회원탈퇴') === true){
        this.openPoup = val;
        if(this.openPoup === false){
            this.logout();
            this.$router.push({path:'/'})
        }
      }
    },
    func: () => {
      if (this.name) {
        this.event.name = this.name;
      }
      if (this.title) {
        this.event.title = this.title;
      }
    },
    // input안의 이미지 파일 넘겨주기
    fileSelect() {
      this.mainImage = this.$refs.memberImage.files[0];
    },
    // 등록버튼
    submit() {
      if (this.namve.length <= 0 || this.title.length <= 0) {
        window.alert("모든 내용을 입력하고 시도해주세요. ");
        return false;
      }

      const formData = new formData();
      formData.append("name", this.name);
      formData.append("title", this.title);
      formData.append("mainImage", this.mainImage);

      axios
        .post("https://localhost:3000/:id", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    memberReset() {
      let params = {
        accessToken: this.accessToken,
        id: this.user.id,
      };
      this.leftMember(params).then((result) => {
          if(result.status ==='error'){
          this.message = result.message;
          this.openPopup = true;
        }else{
          if(result.status === 'success'){
            this.message= '회원탈퇴가 완료되었습니다.'
            this.openPopup = true;
          
          }
        }
      });
    },
    pageMove() {
      this.$router.push({ path: "pwinquiry" });
    },
  },
};
</script>
<style>
.reset {
  margin-left: 220px;
  margin-top: 100px;
}
.width_heywon {
  width: 10%;
}
.together_heywon {
  display: flex;
  justify-content: center;
}
.relocation_heywon {
  margin-top: 12px;
  margin-right: 0px;
}
.file-input {
  margin-left: 50px;
  margin-top: 0px;
  position: absolute;
}
.image-upload {
  position: relative;
}
.hide {
  display: none;
}
</style>
