<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="createUser">
      Inscription
      <!-- <div class="email">
        <input type="email" placeholder="email" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div> -->
      <div class="flex">
        <div class="mail-input">
          <input
            class="swing"
            id="email"
            type="text"
            placeholder="mail@mail.mail"
            v-model="email"
          /><label for="email">Email</label>
        </div>
        <div class="password-input">
          <input
            class="swing"
            id="password"
            type="password"
            placeholder="password"
            v-model="password"
          /><label for="password">Mot de passe</label>
        </div>
      </div>
      <button class="inscription-button" type="submit">
        <span>S'inscrire</span>
      </button>
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
<style scoped lang="scss">
// CSS for input swing
$width-input: 300px;
.swing {
  display: inline-block;
  width: $width-input;
  margin: 40px 0;
  padding: 10px 0 10px 15px;
  font-size: 1em;
  font-weight: 400;
  color: #5c5c5c;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 120px; // Arbitrary.
  margin-left: 120px;
  transition: all 0.3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: relative;
    top: 0;
    left: -$width-input - 15px;
    width: 100px;
    padding: 10px 15px;
    color: whitesmoke;
    // text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
    background: #5f5f5f;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    transform-origin: 2px 2px;
    transform: rotate(0);
    // There should be a better way
    animation: swing-back 0.4s 1 ease-in-out;
  }
}
@keyframes swing {
  0% {
    transform: rotate(0);
  }
  20% {
    transform: rotate(116deg);
  }
  40% {
    transform: rotate(60deg);
  }
  60% {
    transform: rotate(98deg);
  }
  80% {
    transform: rotate(76deg);
  }
  100% {
    transform: rotate(82deg);
  }
}
@keyframes swing-back {
  0% {
    transform: rotate(82deg);
  }
  100% {
    transform: rotate(0);
  }
}
.swing:focus,
.swing:active {
  color: #377d6a;
  text-indent: 0;
  background: #fff;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &::-webkit-input-placeholder {
    color: #aaa;
  }
  + label {
    animation: swing 1.4s 1 ease-in-out;
    transform: rotate(82deg);
  }
}

.inscription-button {
  border-radius: 4px;
  background: linear-gradient(to right, #67b26b, #4ca2cb) !important;
  border: none;
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
  font-size: 22px;
  padding: 20px;
  width: 200px;
  transition: all 0.4s;
  cursor: pointer;
  margin: 5px;
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
</style>
