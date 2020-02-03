<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as firebase from "firebase/app";
import "firebase/auth";
// import { db } from "./firebaseConfig";

@Component({})
export default class App extends Vue {
  public playerConnected = "" as null | string;
  public db = firebase.firestore();
  public mounted() {
    this.db
      .collection("users")
      .get()
      .then((snapshot: any) => {
        snapshot.forEach((doc: any) => {
          console.log(doc.id, "=>", doc.data());
        });
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.email);
        this.playerConnected = user.email;
      } else {
        console.log("No user sign in");
      }
    });
  }
  public createUserInDb(): void {
    this.db
      .collection("users")
      .doc()
      .set({ name: "Paul" });
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
