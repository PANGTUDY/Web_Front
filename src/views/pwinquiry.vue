<template>
    <div>
        <template v-if="!isLoading">
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
                              
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                  
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <div class="h6 font-weight-300"> </div>
                               <div class="h6 font-weight-300"> 
                                <label class="ni ni-lock-circle-open custom-password" for="confirm_password">현재 password</label>
                                <div class="custom-layout">
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="password">
                                </base-input>
                                </div>
                                <label class="ni ni-lock-circle-open custom-password" for="confirm_password">새로운 password</label>
                                    <div class="custom-layout">
                                    <base-input alternative
                                                type="password"
                                                placeholder="Password"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="password">
                                    </base-input>
                                    </div>
                                    <label class="fa fa-check custom-password" for="password">새로운 password 확인</label>
                                    <div class="custom-layout">
                                    <base-input alternative
                                                type="password"
                                                placeholder="Password 재확인"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="password_confirm">
                                    </base-input>
                                    </div>
                                    <div class="text-muted font-italic">
                                        <small>password strength:
                                            <span class="text-success font-weight-700">strong</span>
                                        </small>
                                    </div>   
                               </div>
                             
                            
                        </div>
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <base-button type="info" size="sm" class="mr-4">수정</base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
        </div>
        </template>
        <section class="section section-skew" v-else>
            <p>Loading events</p>
        </section>
    </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';


export default {
    data(){
        return {
            isLoading: true,
            password:'',
            password_confirm:''
            
        };
    },
    methods:{
        func:()=>{
            if(this.name){
                this.event.name = this.name;
        }
            if(this.title){
                this.event.title = this.title;
            }
        },
        // input안의 이미지 파일 넘겨주기
        fileSelect(){
            this.mainImage = this.$refs.memberImage.files[0];
        },
        // 등록버튼 
        submit(){
            if(this.namve.length <= 0 || this.title.length <= 0){
                window.alert('모든 내용을 입력하고 시도해주세요. ');
                return false;
            }

            const formData = new formData();
            formData.append('name',this.name);
            formData.append('title',this.title);
            formData.append('mainImage',this.mainImage);

            axios.post("https://localhost:3000/:id",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            });
        }
        
    },
    created(){
        axios.get('//localhost:3000/profile').then(({data})=>{
            this.isLoading =  false;
            this.event = data.events.events;
            console.log(this.event)
            

        });
    },
};
</script>
<style>
.reset{
    margin-left:220px;
    margin-top:100px;
}
.width_heywon{
    width:10%;
}
.together_heywon{
    display:flex;
    justify-content: center;
}
.relocation_heywon{
    margin-top:12px;
    margin-right: 0px;
}
.file-input{
    margin-left:50px;
    margin-top:0px;
    position:absolute;
   
   
}
.image-upload{
    position:relative;
    
}
.hide{
    display:none;
}
.custom-layout{
    width:40%;
    position:relative;
    left:30%;
}
.custom-password{
    margin-left:-600px;
}
</style>
