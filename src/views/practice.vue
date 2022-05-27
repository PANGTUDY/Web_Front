<template>
  <div>
    <base-input
      v-validate="'required'"
      v-model="password"
      name="password"
      type="password"
      :class="{ 'is-danger': errors.has('password') }"
      placeholder="Password"
      ref="password"
    ></base-input>
    <span v-show="errors.has('password')" class="help is-danger">{{
      errors.first('password')
    }}</span>

    <base-input
      v-validate="'required|confirmed:password'"
      v-model="password_confrimation"
      name="password_confirmation"
      type="password"
      :class="{ 'is-danger': errors.has('password_confirmation') }"
      placeholder="Password, Again"
      data-vv-as="password"
    ></base-input>
    <span v-show="errors.has('password_confirmation')" class="help is-danger">{{
      errors.first('password_confirmation')
    }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      password_confirmation: '',
    };
  },
};
</script>

<style></style>
