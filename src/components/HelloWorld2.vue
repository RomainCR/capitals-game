<template>
  <div>
    <h1>HELLO</h1>
    <vue-slider
      v-model="value"
      :marks="marks"
      :min="0"
      :max="5"
      :width="300"
      :useKeyboard="true"
      :duration="0.2"
    >
      <template v-slot:dot="{ value, focus }">
        <div :class="['custom-dot', { focus }]"></div>
      </template>
      <template v-slot:step="{ label, active }">
        <div :class="['custom-step', { active }]"></div>
      </template>
      <template v-slot:label="{ label, active }">
        <div :class="['vue-slider-mark-label', 'custom-label', { active }]">
          {{ label }}
        </div>
      </template>
      <template v-slot:tooltip="{ value, active }">
        <div class="custom-tooltip">{{ value }}</div>
      </template>
    </vue-slider>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

@Component({
  components: {
    VueSlider
  }
})
export default class HelloWorld2 extends Vue {
  public data() {
    return {
      value: 0,
      marks: (val: any) => val % 1 === 0
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
.custom-dot {
  width: 100%;
  height: 200%;
  position: absolute;
  bottom: -8px;
  border-radius: 0;
  background-color: pink;
  transition: all 1s;
}
.custom-dot:hover {
  // transform: rotateZ(45deg);
}
.custom-dot.focus {
  width: 100%;
  height: 100%;
  bottom: 0;
  border-radius: 50%;
}
.vue-slider-ltr .vue-slider-mark-label {
  display: none;
}
.custom-label {
  display: none;
}
.custom-label.active {
  color: none;
  display: none;
}
.custom-tooltip {
  background: pink;
  width: 40px;
  height: 30px;
  padding-top: 10px;
  border-radius: 50%;
  transition-duration: 1s;
  transition-delay: 2s;
}
.custom-tooltip.active {
  color: none;
  display: none;
  background: rgb(216, 53, 80);
}
.custom-tooltip.focus {
  color: none;
  display: none;
  background: rgb(64, 66, 187);
}
</style>
