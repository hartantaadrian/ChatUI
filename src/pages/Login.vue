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
    <div class="container py-5">
      <div class="row">
        <div class="card py-5 col-md-12 mx-sm-auto mx-md-0 ">
          <div class="login-profile-container ">
            <img
              class="profile"
              src="../img/undraw_profile_pic_ic5t.svg"
            />
          </div>
          <div class="text-center login-content">
            <h1>Login</h1>
            <div class="m-5 p-5">
              <b-form
                @submit="submit"
                class="mx-auto"
              >
                <b-form-group id="input-group-1">
                  <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon icon="person-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      v-model="form.email"
                      placeholder="Email"
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
                <b-form-group class="text-left py-0">
                  <a
                    v-b-modal.modal-1
                    class="mb-0 text-danger"
                  >Create account</a>
                </b-form-group>

                <b-button
                  class="mt-3 px-5 login-button"
                  type="submit"
                  variant="danger"
                >Login</b-button>
              </b-form>

            </div>

          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-1"
      title="SignUp Here"
      hide-footer
    >
      <SignupForm></SignupForm>
    </b-modal>
  </div>
</template>

<script>
import axios from "../util/api.js";
import SignupForm from "../components/SignupForm";
export default {
  components: {
    SignupForm,
  },
  props: ["notif", "msg"],
  data() {
    return {
      notification: this.notif,
      messageNotif: this.msg,
      form: {
        email: "",
        password: "",
      },
      failLogin: false,
      errMsg: null,
    };
  },

  methods: {
    submit() {
      event.preventDefault();
      this.notification = false;
      this.failLogin = false;
      console.log(this.form);
      axios
        .post("/api/users/login", this.form)
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
            : (this.errMsg = err);
        });
    },
  },
};
</script>
<style scoped>
.card {
  box-sizing: border-box;
}

form {
  margin-top: -34px;
  max-width: 500px;
}

.form-control:focus {
  box-shadow: none;
}
.profile {
  width: 200px;
}
.login-profile-container {
  left: 50%;
  transform: translateY(-80%);
  margin: 0;
  padding: 0;
}
.login-icon {
  max-width: 500px;
}
.login-content {
  margin-top: -220px;
}

.login-button {
  width: 100%;
}

.text-danger {
  font-weight: bold;
  cursor: pointer;
}
</style>
