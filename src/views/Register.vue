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
                                <small>Or sign up with credentials</small>
                            </div>
                            <form role="form" @submit.prevent="register">
                                <label class="ni ni-hat-3" for="name"> name</label>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="name "
                                            v-model="name">
                                </base-input>
                                 <label class="ni ni-email-83" for="email"> email</label>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            v-model="email">
                                </base-input>
                                <label class="fa fa-check" for="comfirm_email"> confirm email</label>
                                <span id="onlyemail">
                                  <base-input alternative
                                            class="mb-3 loose"
                                            placeholder="Email 인증"
                                            >
                                </base-input>
                                <div>
                                    <base-button btn_type="primary" class="reform" type="submit">인증번호 전송</base-button>
                                </div>
                                </span>
                                <label class="ni ni-lock-circle-open" for="confirm_password"> password</label>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="password">
                                </base-input>
                                <label class="fa fa-check" for="password">confirm password</label>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password 재확인"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            >
                                </base-input>
                                <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small>
                                </div>
                                <base-checkbox>
                                    <span>I agree with the
                                        <a href="#">Privacy Policy</a>
                                    </span>
                                </base-checkbox>
                                <div class="text-center">
                                    <span class="text-success font-weight-700"><router-link to="/login">Already have an account? Login</router-link></span>
                                </div>
                                <div class="text-center">
                                    <base-button btn_type="primary" class="my-4" type="submit">Create account</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return {
           name:'',
           email:'',
           password:'',
        }
    },
    methods:{
        register(){
            this.$store.dispatch('register',{
                name: this.name, email: this.email, password: this.password
            }).then(()=>{
                this.$router.push({name:'components'})
            })
        }
       
    }
};
</script>
<style>
#onlyemail{
    display:flex;
    flex-wrap:wrap;
    height:80%;
    
}
.loose{
    width: 70%;
    height:40%;
}
.reform{
    margin-left:10px;
    background-color:rgb(18, 17, 41);
    color:white;
}
</style>
