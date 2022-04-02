<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-primary">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 custom-card">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/github.svg">
                                    Github
                                </base-button>

                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                            </div>
                                <base-input alternative
                                            class="mb-3"
                                            name="email"
                                            
                                            v-model="email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            name="password"
                                            
                                            v-model="password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                              
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="aler-danger">
                                    <p></p>
                                </div>
                                <div class="text-center">
                                    <base-button btn_type="primary" class="my-4" type="submit" @click="getUser">login</base-button>
                                </div>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a class="text-light"><router-link to="/register">
                                <small>Create new account</small>
                                </router-link>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>


import validator from './mixin/validator'
import directives from './mixin/myDirectives'
import {mapState,mapActions} from 'vuex';
export default {
    components:{
    directives,
    },
    data:()=>({
        email:'',
        password:''
    }),
    computed:{
        ...mapState({
            accessToken:({accessToken}) => accessToken,
            refreshToken:({refreshToken}) => refreshToken
        })
    },
   methods:{
       ...mapActions(['login']),
       getUser(){
           this.login({
               email: this.email,
               password: this.password
           }).then(()=>{
               //this.$router.push({name:'components'})
           })
       }
   }
};
</script>
<style>
.alert-danger p{
    color:red;
}
.error{
    color:red;
}
</style>
