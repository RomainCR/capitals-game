<template>
  <div class="hello">
    <h3>Pays restants : {{ listOfCountries.length }}</h3>
    <label class="switch">
      <input type="checkbox" v-model="acceptAccents" @change="switchAccent" />
      <span class="slider round"></span>
      <p>Accents faciles</p>
    </label>
    <label class="switch">
      <input type="checkbox" v-model="acceptHyphens" @change="switchAccent" />
      <span class="slider round"></span>
      <p>Tirets faciles</p>
    </label>
    <h1>{{ randomCountry }}</h1>
    <input
      id="capital"
      type="text"
      class="inputCap"
      v-model="capital"
      @input="testIfTrue()"
    />
    <button class="pass" @click="goNext">Passer</button>
    <button class="pass" @click="showLengthHint">{{ lengthHint }}</button>
    <button class="pass" @click="showFirstLetter">{{ firstLetter }}</button>
    <!-- <p v-if="feedback">{{ feedback }}</p> -->
    <div class="flex center listOfAnswers">
      <div class="list-of-answers">
        <h3>Bonnes réponses : {{ goodAnswers.length }}</h3>
        <p v-for="goodAnswer in goodAnswers" :key="goodAnswer">
          {{ goodAnswer }}
        </p>
      </div>
      <div class="list-of-answers">
        <h3>Mauvaises réponses : {{ badAnswers.length }}</h3>
        <p v-for="badAnswer in badAnswers" :key="badAnswer">{{ badAnswer }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { list } from "../assets/list";

@Component
export default class CapitalTest extends Vue {
  public listOfCountries = [] as string[];
  public listOfCapitals = [] as string[];
  public randomNumber = Math.floor(Math.random() * this.listOfCountries.length);
  public randomCountry = "PAYS";
  public goodAnswers = [] as string[];
  public badAnswers = [] as string[];
  public feedback = "STILL WRONG";
  public acceptAccents = false;
  public acceptHyphens = false;
  public lengthHint = "Indice de longueur";
  public firstLetter = "Première lettre";

  public data() {
    return {
      capital: ""
    };
  }

  public mounted() {
    this.listOfCountries = list.filter((x, index) => index % 2 === 0);
    this.listOfCapitals = list.filter((x, index) => index % 2 === 1);
    this.randomNumber = Math.floor(Math.random() * this.listOfCountries.length);
    this.randomCountry = this.listOfCountries[this.randomNumber];
    console.log(
      this.listOfCountries[1].normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      "y"
    );
    const a = "élo-alà-Êmin ça";
    const b = a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    console.log(b.replace(/[^A-zÀ-ÿ]/gi, ""), "hyp");
  }

  public switchAccent() {
    console.log(this.acceptAccents);
    console.log(this.acceptHyphens);
  }

  public goNext() {
    this.badAnswers.unshift(
      `${this.listOfCountries[this.randomNumber]} : ${
        this.listOfCapitals[this.randomNumber]
      }`
    );
    this.listOfCountries.splice(this.randomNumber, 1);
    this.listOfCapitals.splice(this.randomNumber, 1);
    this.randomNumber = Math.floor(Math.random() * this.listOfCountries.length);
    this.randomCountry = this.listOfCountries[this.randomNumber];
    this.$data.capital = "";
    this.lengthHint = "Indice de longueur";
    this.firstLetter = "Première lettre";
  }

  public showLengthHint() {
    this.lengthHint = `${
      this.listOfCapitals[this.randomNumber].length
    } lettres`;
  }

  public showFirstLetter() {
    this.firstLetter = `${
      this.listOfCapitals[this.randomNumber][0]
    } est la première lettre`;
  }

  public testIfTrue() {
    let inputCapitale = this.$data.capital.toLowerCase();
    let trueCapitale = this.listOfCapitals[this.randomNumber].toLowerCase();
    if (this.acceptAccents) {
      inputCapitale = inputCapitale
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      trueCapitale = trueCapitale
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }
    if (this.acceptHyphens) {
      inputCapitale = inputCapitale.replace(/[^A-zÀ-ÿ]/gi, "");
      trueCapitale = trueCapitale.replace(/[^A-zÀ-ÿ]/gi, "");
    }
    if (inputCapitale === trueCapitale) {
      this.goodAnswers.unshift(
        `${this.listOfCountries[this.randomNumber]} : ${
          this.listOfCapitals[this.randomNumber]
        }`
      );
      this.listOfCountries.splice(this.randomNumber, 1);
      this.listOfCapitals.splice(this.randomNumber, 1);
      this.randomNumber = Math.floor(
        Math.random() * this.listOfCountries.length
      );
      this.randomCountry = this.listOfCountries[this.randomNumber];
      this.$data.capital = "";
      this.lengthHint = "Indice de longueur";
      this.firstLetter = "Première lettre";
    } else {
      this.feedback = "mauvaise capital";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .hello {
//   background-color:rgb(24, 25, 58)
// }
.inputCap {
  font-size: 30px;
}
.flex {
  display: flex;
}
.center {
  justify-content: center;
}
.list-of-answers {
  margin: 10px 30px;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  margin: 10px;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
