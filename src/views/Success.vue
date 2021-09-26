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
                                <small>로그인이 완료되었습니다</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral" @click="goToPages">
                                    <img slot="icon" src="img/icons/common/pangtudy_logo.jpg.png">
                                    메인으로 가기
                                </base-button>

                                <base-button type="neutral">
                                    로그아웃하기
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Successful signIn</small>
                            </div>
                            <!-- <form role="form" @submit="onSubmit">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            v-model="uid"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button btn_type="primary" class="my-4" type="submit">로그인</base-button>
                                </div>
                            </form> -->
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
import {mapActions} from 'vuex'
export default {
   methods:{
       goToPages(){
           this.$router.push({
               name:'components'
           })
       }
   }

    } 


</script>
<style>
</style>
