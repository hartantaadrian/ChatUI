<template>
  <div class="main-background">
    <div class="container">
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="light"
      >
        <b-navbar-brand
          href="#"
          class="container "
        >
          <h1 class="ml-auto">C H A T R O O M </h1>
        </b-navbar-brand>
      </b-navbar>
    </div>
    <div class="container py-5">
      <slide-y-up-transition
        mode="out-in"
        origin="center top"
      >
        <router-view></router-view>
      </slide-y-up-transition>
    </div>
  </div>
</template>
<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "auth-layout",
  components: {
    SlideYUpTransition,
  },

  methods: {},
};
</script>
<style scoped>
.logo {
  max-width: 180px;
}
.bg-light {
  background-color: #fff !important;
}

h1 {
  color: black;
}
</style>