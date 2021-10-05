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
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy-image src="../../public/img/icons/common/account.png" class="rounded-circle">
                                        <input @change='onInputImage()' ref="serveyImage" type="file">
                                        <base-button type="info" size="sm" class="mr-4 reset"><i class="fa fa-plus-square" aria-hidden="true"></i></base-button>
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <base-button type="info" size="sm" class="mr-4">Connect</base-button>
                                    <base-button type="default" size="sm" class="float-right">Message</base-button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                  
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>
                                <span class="font-weight-light">{{events[0].name}}</span>
                            </h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{events[0].email}}</div>
                            <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>{{events[0].date}}</div>
                            <div><i class="ni education_hat mr-2"></i>University of Computer Science</div>
                        </div>
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <base-button type="info" size="sm" class="mr-4">회원탈퇴</base-button>
                                    <base-button type="info" size="sm" class="mr-4">저장</base-button>
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
            events:''
        };
    },
    created(){
        axios.get('//localhost:3000/profile').then(({data})=>{
            this.events = data.events.events
           
            this.isLoading =  false;
            console.log(this.events);
        },);
    },
};
</script>
<style>
.reset{
    margin-left:220px;
    margin-top:100px;
}
</style>
