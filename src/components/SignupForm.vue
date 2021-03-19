<template>
  <div>
    <div
      v-if="failLogin"
      class="container mb-5"
    >
      <b-alert
        show
        variant="danger"
      >{{ this.errMsg }}</b-alert>
    </div>
    <b-form
      @submit="submit"
      class="mx-auto py-5"
    >
      <b-form-group id="input-group-3">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="envelope-open-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            type="text"
            v-model="form.email"
            placeholder="Email"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group id="input-group-1">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            type="text"
            v-model="form.name"
            placeholder="Name"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group id="input-group-2">
        <b-input-group class>
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            type="password"
            v-model="form.password"
            placeholder="Password"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group id="input-group-2">
        <b-input-group class>
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            type="password"
            v-model="form.confirmPassword"
            placeholder="Confirm Password"
            @change="validatePassConfirm()"
            @keyup="validatePassConfirm()"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-col
        sm="12"
        class="text-left error-container "
        v-if="!isValidConfirm"
      >
        <label class="err-text">Password not valid</label>
      </b-col>

      <div style="text-align:right">
        <b-button
          class="mt-3 px-5 login-button ml-auto"
          type="submit"
          variant="danger"
          :disabled="!isValidConfirm"
        >SignUp</b-button>
      </div>
    </b-form>
  </div>
</template>
<script>
import axios from "../util/api.js";

export default {
  name: "Signupform",
  props: {},
  components: {},

  data() {
    return {
      notification: this.notif,
      messageNotif: this.msg,
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      failLogin: false,
      errMsg: null,
      isValidConfirm: false,
    };
  },

  methods: {
    validatePassConfirm() {
      console.log(this.form);
      this.isValidConfirm =
        this.form.confirmPassword === this.form.password ? true : false;
    },
    submit() {
      event.preventDefault();
      this.notification = false;
      this.failLogin = false;
      console.log(this.form);
      axios
        .post("/api/users/signin", this.form)
        .then((resp) => {
          console.log(resp);
          if (resp.data.token) {
            localStorage.setItem("token", resp.data.token);
            this.$router.push("/chat");
          }
        })
        .catch((err) => {
          console.log(err);
          this.failLogin = true;
          err?.response.status === 401
            ? (this.errMsg = "Wrong username or password")
            : err?.response.status === 422
            ? (this.errMsg = "Email has been used")
            : (this.errMsg = err);
        });
    },
  },
};
</script>
<style scoped>
.err-text {
  color: #bd2130;
}

.error-container {
  padding: 0;
}
</style>