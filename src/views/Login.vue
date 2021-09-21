<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
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
                          class="border-0">
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
                            <form v-on:submit.prevent="login">
                                <base-input alternative
                                            class="mb-3"
                                            name="email"
                                            v-validate="'required|email'" 
                                            data-vv-as="email"
                                            placeholder="Email"
                                            v-model="email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <p class="error" v-show="errors.has('email')">
                                    {{errors.first('email')}}
                                </p>
                                <base-input alternative
                                            type="password"
                                            name="password"
                                            data-vv-as="password"
                                            placeholder="Password"
                                            v-validate="'numeric'"
                                            v-model="password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                 <p class="error" v-show="errors.has('password')">
                                    {{errors.first('password')}}
                                </p>
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="aler-danger">
                                    <p></p>
                                </div>
                                <div class="text-center">
                                    <base-button btn_type="primary" class="my-4" type="submit">login</base-button>
                                </div>
                            </form>
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
import {mapActions,mapGetters} from 'vuex'

export default {
    name:'Login',
    data(){
        return {
            email:'',
            password:''
        }
    },
   methods:{
       login(){
           this.$store.dispatch('login',{
               email:this.email,
               password:this.password
           })
           .then(()=>{
               this.$router.push({name:'components'})
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
