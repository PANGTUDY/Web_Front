<template>
    <div class="heywon-theme">
        <template v-if="!isLoading">
            <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew-heywon alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="heywon-title">회원 탈퇴</div>
        </section>
        <section class="section section-skew heywon-width">
            <div class="container">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                              <div><img src="../../public/img/icons/common/warning.png" width="200px" height="200px"/></div>
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
                            <div class="h6 font-weight-300"> 

                                <b>회원 탈퇴시 모든 정보가 삭제됩니다.</b> 
                            </div>
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
                              
                                    <div class="text-muted font-italic">
                                        <!-- <small>password strength:
                                            <span class="text-success font-weight-700">strong</span>
                                        </small> -->
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
        
        
    },
    created(){
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
    width:80%;
    position:relative;
    left:10%;
}
.custom-password{
    position: relative;
    left:5%;
}
.heywon-top{
    margin-top:170px;
    
}


.heywon-width{
    width: 60%;
    position: relative;
    left:20%;
    top:-500px;
}
.heywon-title{
    font-size:22px;
    color:white;
    position:relative;
    top:50px;
    left:20%;
}
.card{
    position:relative;
    top:20%;
    
}
.heywon-theme{
    max-height:700px;
}
</style>
