<template>
  <div class="hello">
    <div class="countdown-div" v-if="countdown < 4 && countdown > 0">
      <h1 class="countdown flex center">{{ countdown }}</h1>
    </div>
    <h1>Trouvez la bonne capitale</h1>
    <h3>
      Pays restants : {{ value - badAnswers.length - goodAnswers.length }}
    </h3>
    <div class="flex center">
      <h4>Nombre de pays souhaités</h4>
      <vue-slider
        v-model="value"
        :max="197"
        :marks="marks"
        :included="true"
        :width="300"
      ></vue-slider>
    </div>
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
    <button class="pass" @click="startTimer">Commencer</button>
    <h3>{{ timer }}</h3>
    <input
      :disabled="disallowInput"
      id="capital"
      type="text"
      class="inputCap"
      :placeholder="capitalPlaceholder"
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
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

@Component({
  components: {
    VueSlider
  }
})
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
  public capitalPlaceholder = "Capitale";
  public timer = 0;
  public countdown = 4;
  public disallowInput = true;
  public malus = 1;
  public result = 0;

  public data() {
    return {
      capital: "",
      actualCapital: "",
      value: 10,
      marks: [10, 20, 50, 100, 197]
    };
  }

  public mounted() {
    this.listOfCountries = list.filter((x, index) => index % 2 === 0);
    this.listOfCapitals = list.filter((x, index) => index % 2 === 1);
    this.randomNumber = Math.floor(Math.random() * this.listOfCountries.length);
    this.randomCountry = this.listOfCountries[this.randomNumber];
  }

  public switchAccent() {
    console.log(this.acceptAccents);
    console.log(this.acceptHyphens);
  }

  public goNext() {
    this.testEnd();
    this.timer += 5;
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
    this.capitalPlaceholder = "Capitale";
  }

  public showLengthHint() {
    this.$data.capital = "";
    this.lengthHint = `${
      this.listOfCapitals[this.randomNumber].length
    } lettres`;
    if (
      this.capitalPlaceholder !== "Capitale" &&
      this.capitalPlaceholder[0] !== "*"
    ) {
      this.capitalPlaceholder = this.listOfCapitals[this.randomNumber].replace(
        /\B[A-z]/g,
        "*"
      );
    } else {
      this.capitalPlaceholder = this.listOfCapitals[this.randomNumber].replace(
        /[A-z]/g,
        "*"
      );
    }
  }

  public showFirstLetter() {
    this.$data.capital = "";
    this.firstLetter = `${
      this.listOfCapitals[this.randomNumber][0]
    } est la première lettre`;
    if (
      this.capitalPlaceholder !== "Capitale" &&
      this.capitalPlaceholder[1] === "*"
    ) {
      this.capitalPlaceholder =
        this.listOfCapitals[this.randomNumber][0] +
        this.capitalPlaceholder.slice(1);
    } else {
      this.capitalPlaceholder = this.listOfCapitals[this.randomNumber][0];
    }
  }

  public testEnd() {
    if (this.goodAnswers.length + this.badAnswers.length === this.$data.value) {
      this.result = this.timer;
    }
  }

  public increaseTimer() {
    const a = setInterval(() => {
      this.timer += 1 * this.malus;
      if (
        this.goodAnswers.length + this.badAnswers.length ===
        this.$data.value
      ) {
        clearInterval(a);
        this.disallowInput = true;
      }
    }, 1000);
    this.disallowInput = false;
  }

  public startTimer(): void {
    setInterval(() => this.countdown--, 1000);
    setTimeout(this.increaseTimer, 4000);
  }

  public testIfTrue() {
    this.testEnd();
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
      this.capitalPlaceholder = "Capitale";
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
.countdown {
  font-size: 20vw;
}
.countdown-div {
  width: 100vw;
  height: 100vh;
  background-color: #7ea3c298;
  margin-top: -98px;
  position: absolute;
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
