<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="createUser">
      Register
      <div class="email">
        <input type="email" placeholder="email" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import * as firebase from "firebase/app";
import "firebase/auth";

@Component({})
export default class HelloWorld extends Vue {
  public error!: string;
  public data() {
    return {
      email: "",
      password: "",
      error: this.error
    };
  }
  public created() {
    console.log(firebase);
  }
  public createUser() {
    console.log(this.$data.password, "pass");
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.$data.email, this.$data.password)
      .catch(error => {
        this.error = error;
        console.log(error.code, ":", error.message);
      })
      .then(() => {
        console.log("OK");
        this.$router.replace({ name: "about" });
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
