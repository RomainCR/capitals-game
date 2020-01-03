<template>
  <div>
    <form @submit.prevent="register">
      Register
      <div class="email">
        <input type="email" placeholder="email" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script lang="ts">
import * as firebase from "firebase/app";
import "firebase/auth";
import { Component, Prop, Vue } from "vue-property-decorator";

export default class Register extends Vue {
  public email = "email";
  public password = "pass";
  public error!: string;

  public mounted() {
    console.log(this.email, "data");
  }

  public register(): void {
    console.log(this.email);
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log("here");
        this.$router.replace({ name: "about" });
      })
      .catch(error => (this.error = error));
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>
