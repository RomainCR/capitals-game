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
      <vue-slider v-model="slider" :marks="marks" :min="0" :max="5" :width="300" :useKeyboard="true">
      <template v-slot:step="{ label, active }">
        <div :class="['custom-step', { active }]"></div>
      </template>
    </vue-slider>
      <h4 ref="sliderValue" class="custom-rangeslider__tooltip">{{slider}}</h4>
  <input v-model="slider" type="range" min="0" max="5" value="0" class="slider" id="myRange" @input="changeValuePosition">
</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

@Component({
  components: {
    VueSlider
  }
})
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
    styleValue.style.left = `${this.slider*59.4+24}px`
    
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
//   background-color:rgb(24, 25, 58)
// }
  .custom-step {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #ccc;
    background-color: #fff;
  }
  .custom-step.active {
    box-shadow: 0 0 0 3px #3498db;
    background-color: #3498db;
  }

// .custom-rangeslider__tooltip {
//   line-height : 20px;
//   position : relative;
//   color: white;
//   // height : 20px;
//   // width : 40px;
//   display: inline;
//   background-color : #0B132B;
//   padding : 5px 14px;
//   border : 2px solid #CE3089;
//   top : -40px;
//   left : 24px;;
//   text-align : center;
//   border-radius : 3px;
//   transition-duration: 0.2s;

//   &:after {
//     z-index: -1;;
//     display: block;
//     content: ' ';
//     background: #CE3089;
//     position: absolute;
//     border: 2px solid #CE3089;
//     border-top: 0; 
//     border-left: 0;
//     width: 10px;
//     height: 10px;
//     left: calc(50% - 6px);
//     bottom: -7px;
//     transform: rotate(45deg);
//   }
// }

// .slidecontainer {
//   margin-top: 150px;
// }
// .sliderValue {
//   position: relative;
//   display: inline;
//   transition-duration: 0.2s;
//   // border: solid 2px black;
//   // border-radius: 20px;
//   background-color: aqua;
//   bottom: 40px;
//   padding: 4px;
//   margin-right: -22px;
//   transition-duration: 0.2s;
// }

// .slider {
//   -webkit-appearance: none;
//   width: 300px;
//   height: 6px;
//   border-radius: 5px;  
//   background: #ffffff;
//   outline: none;
//   opacity: 0.7;
//   -webkit-transition: .2s;
//   transition: opacity .2s;
// }

// .slider::-webkit-slider-thumb {
//   -webkit-appearance: none;
//   appearance: none;
//   width: 6px;
//   height: 16px;
//   // border-radius: 1px; 
//   background: #CE3089;
//   cursor: pointer;
// }

// .slider::-moz-range-thumb {
//   width: 6px;
//   height: 20px;
//   border: none;
//   // border-radius: 50%;
//   background: #CE3089;
//   cursor: pointer;
// }

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

/*Chrome*/
// @media screen and (-webkit-min-device-pixel-ratio:0) {
//     input[type='range'] {
//       overflow: hidden;
//         -webkit-appearance: none;
//     }
    
//     input[type='range']::-webkit-slider-runnable-track {
//       height: 10px;
//       -webkit-appearance: none;
//       color: #13bba4;
//       margin-top: -1px;
//     }
    
//     input[type='range']::-webkit-slider-thumb {
//       width: 10px;
//       -webkit-appearance: none;
//       height: 20px;
//       cursor: ew-resize;
//       background: #c03b3b;
//       box-shadow: -80px 0 0 80px #43e5f7;
//     }

// }
/** FF*/
input[type="range"]::-moz-range-progress {
  background-color: #CE3089; 
}
input[type="range"]::-moz-range-track {  
  background-color: #000000;
}
/* IE*/
input[type="range"]::-ms-fill-lower {
  background-color: #CE3089; 
}
input[type="range"]::-ms-fill-upper {  
  background-color: #000000;
}
</style>
