<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="createUser">
      Login
      <div class="email">
        <input type="email" placeholder="email" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script lang="ts">
import * as firebase from "firebase/app";
import "firebase/auth";
import { Component, Prop, Vue } from "vue-property-decorator";

export default class Login extends Vue {
  public data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  }

  public pressed(): void {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.$data.email, this.$data.password)
      .then(() => {
        console.log("here");
        this.$router.replace({ name: "secret" });
      })
      .catch(error => (this.$data.error = error));
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
