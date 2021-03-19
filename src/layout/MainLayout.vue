<template>
  <div>
    <div class="main-content">

      <b-navbar
        variant="danger"
        class="topnav border-bottom border-light"
      >
        <h1 class="title">C h a t R o o m</h1>
        <b-navbar-nav class="ml-auto">
          <b-button
            size="sm"
            class="my-2 my-sm-0"
            variant="danger"
            @click="logout"
          >Logout</b-button>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <slide-y-up-transition
      mode="out-in"
      origin="center top"
    >
      <div class="main-content ">
        <router-view></router-view>
      </div>
    </slide-y-up-transition>
  </div>

</template>

<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  components: {
    SlideYUpTransition,
  },
  data() {
    return {
      user: "",
      menus: [],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
.logout {
  color: white;
}
.title {
  color: white;
}
</style>
