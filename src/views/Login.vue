<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="createUser">
      <center>
        <h3>
          Connexion
        </h3>
        <div class="input">
          <input
            class="thin-input"
            id="email"
            type="text"
            placeholder="mail@mail.mail"
            v-model="email"
            required
          />
          <label for="name" class="form__label">Email</label>
        </div>
        <div class="input">
          <input
            class="thin-input"
            id="password"
            type="password"
            placeholder="password"
            v-model="password"
            required
          />
          <label for="name" class="form__label">Mot de passe</label>
        </div>
        <button class="inscription-button" type="submit">
          <span>Se connecter</span>
        </button>
      </center>
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

  public createUser() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.$data.email, this.$data.password)
      .catch(error => {
        this.error = error;
        console.log(error.code, ":", error.message);
      })
      .then(() => {
        console.log(firebase);
        this.$router.replace({ name: "about" });
      });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      } else {
        console.log("No user sign in");
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input {
  position: relative;
  padding: 15px 0 0;
  margin-top: 30px;
  width: 300px;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
.center {
  justify-content: center;
}

// CSS for input swing
$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 300px;
}

.thin-input {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  // color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1rem;
    cursor: text;
    top: 15px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
}

.thin-input:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  border-bottom: 2px solid teal;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
/* demo */
body {
  font-family: Montserrat, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  background-color: #222222;
}

// End of input
// Start of button
.inscription-button {
  border-radius: 4px;
  background: linear-gradient(to right, #67b26b, #4ca2cb) !important;
  border: none;
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
  font-size: 22px;
  padding: 20px;
  width: 250px;
  transition: all 0.4s;
  cursor: pointer;
  margin: 60px;
}
.inscription-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.4s;
}
.inscription-button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.inscription-button:hover span {
  padding-right: 25px;
}
.inscription-button:hover span:after {
  opacity: 1;
  right: 0;
}
// End of button
</style>
