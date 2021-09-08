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
                            <form v-on:submit.prevent="onSubmit">
                                <base-input alternative
                                            class="mb-3"
                                            name="email"
                                            v-validate="'required|email'" 
                                            data-vv-as="email"
                                            placeholder="Email"
                                            v-model="uid"
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
                                <div class="aler-danger" v-if="errorState">
                                    <p></p>
                                </div>
                                <div class="text-center">
                                    <base-button btn_type="primary" class="my-4" type="submit">로그인</base-button>
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
                            <a href="#" class="text-light">
                                <small>Create new account</small>
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
            uid:'',
            password:''
        }
    },
    methods:{
        ...mapActions(['login']),
        async onSubmit(){
            this.$validator.validateAll() // validation check
            if(!this.errors.any()){ // 아무 문제 없으면 아래 코드 실행 
            try{
                
                let loginResult = await this.login({uid:this.uid,password:this.password})
                console.log(loginResult)
                if(loginResult) this.goToPages()
            }catch(err){
                console.error(err)
            }
            }else{
                console.log('validate err')
            }
        },
        goToPages(){
            this.$router.push({
                name:'success'
            })
        }
    },
    computed:{
        ...mapGetters({
            errorState:'getErrorState'
        })
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
