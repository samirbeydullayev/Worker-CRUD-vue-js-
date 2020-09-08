<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
      <h4 class="text-center mt-5 mb-5">{{tableName}} Table</h4>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { EventBus } from "./main";
import Header from "./components/Header";

export default {
  name: "app",
  data() {
    return {
      tableName: "",
    };
  },
  components: {
    appHeader: Header,
  },
  created() {
    EventBus.$on("tableName", (name) => {
      this.tableName = name;
    });

    this.$store.dispatch("initAppWorker");
    this.$store.dispatch("initAppCategory");
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// .form-group {
//   &.is-invalid {
//     input{
//       border: 1px solid #dc3545;
//     }
//     span{
//       color: #dc3545;
//     }
//   }
// }
</style>
