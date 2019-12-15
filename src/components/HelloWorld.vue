<template>
  <div class="hello">
    <!-- <h1>{{ toeic }}</h1> -->
    <input id="toeic" class="skinny" type="text" v-model="toeic" @input="filterToeic()">
    <label for="toeic">TOEIC : </label>
    <p v-if="feedbackToeic">Entrez un score entre 1 et 990</p>
    <label for="toefl">TOEFL : </label>
    <input id="toefl" type="text" v-model="toefl" @input="filterToefl()">
    <p v-if="feedbackToefl">Entrez un score entre 1 et 120</p>
    <div class="slidecontainer">
      <h4 ref="sliderValue" class="sliderValue">{{slider}}</h4>
  <input v-model="slider" type="range" min="0" max="5" value="0" class="slider" id="myRange" @input="changeValuePosition">
</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  public feedbackToeic = false;
  public feedbackToefl = false;
  public slider = 0;
  private toeicRegex = /^([1-9]|[1-9]\d|[1-8]\d\d|9[1-8]\d|99[0])$/
  private toeflRegex = /^([1-9]|[1-9]\d|1[0-1]\d|12[0])$/
  public data() {
    return {
      toeic:'',
      toefl:''
    }
  }
  public changeValuePosition() {
    const styleValue = this.$refs.sliderValue as HTMLElement;
    styleValue.style.left = `${this.slider*55}px`
    
  }

  public filterToeic() {
    if (!this.toeicRegex.test(this.$data.toeic)) {
      this.$data.toeic = this.$data.toeic.slice(0, -1);
      this.feedbackToeic = true;
    } else {
      this.feedbackToeic = false
    }
  }
    public filterToefl() {
    if (!this.toeflRegex.test(this.$data.toefl)) {
      this.$data.toefl = this.$data.toefl.slice(0, -1);
      this.feedbackToefl = true
    } else {
      this.feedbackToefl = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .hello {
//   display: flex;
//   flex-direction: row;
// }
.slidecontainer {
  margin-top: 150px;
}
.sliderValue {
  position: relative;
  display: inline;
  transition-duration: 0.2s;
  // border: solid 2px black;
  // border-radius: 20px;
  bottom: 40px;
  padding: 4px;
  margin-right: -22px;
  transition-duration: 0.2s;
}
.slider {
  -webkit-appearance: none;
  width: 300px;
  height: 6px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%; 
  background: rgb(69, 91, 190);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(69, 91, 190);
  cursor: pointer;
}

.skinny {
  display: inline-block;
  width: 215px;
  padding: 10px 0 10px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: rgb(69, 91, 190);
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 80px; // Arbitrary.
  transition: all .3s ease-in-out;
  
  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: relative;
    transform: translateX(0);
    color: white;
    top: 15px;
    left: -230px;
    padding: 10px 15px;
    text-shadow: 0 1px 0 rgba(35, 90, 192, 0.4);
    transition: all .3s ease-in-out;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    overflow: hidden;

    &:before,
    &:after {
      content: "";
      position: absolute;
      right: 0;
      left: 0;
      z-index: -1;
      transition: all .3s ease-in-out;
    }
    &:before {
      // Skinny bit here
      top: 5px;
      bottom: 5px;
      background: rgb(43, 107, 190); // change this to #134A46
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:after {
      top: 0;
      bottom: 0;
      background: rgb(36, 70, 161);
    }
  }
}
.skinny:focus,
.skinny:active {
  color: rgb(49, 89, 197);
  text-indent: 0;
  background: #fff;
  
  &::-webkit-input-placeholder {
    color: #aaa;
  }
  + label {
    transform: translateX(-100%);
    
    &:after {
      transform: translateX(100%);
    }
  }
}
</style>
