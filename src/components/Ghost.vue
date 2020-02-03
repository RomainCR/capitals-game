<template>
  <div>
    <h1>GHOST</h1>
    <div class="all-images">
      <div>
        <h2>{{ landscape.title }}</h2>
        <div class="img">
          <img :src="landscape.feature_image" class="image" />
          <p class="txt-on-image">{{ landscape.excerpt }}</p>
        </div>
      </div>
      <div>
        <h2>{{ fruits.title }}</h2>
        <div class="img">
          <img :src="fruits.feature_image" class="image" />
          <p class="txt-on-image">{{ fruits.excerpt }}</p>
        </div>
      </div>
      <div>
        <h2>{{ turtle.title }}</h2>
        <div class="img">
          <img :src="turtle.feature_image" class="image" />
          <p class="txt-on-image">{{ turtle.excerpt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({})
export default class Ghost extends Vue {
  public data() {
    return {
      turtle: {},
      landscape: {},
      fruits: {}
    };
  }
  public mounted(): void {
    const data = axios.get(
      "http://localhost:2368/ghost/api/v3/content/posts/?key=8e4e35b5782e30f8d120cdee6b&include=tags&filter=tag:landscape"
    );
    data.then(x => console.log("ghost -> ", x.data.posts[0]));
    const dataLandscape = axios.get(
      "http://localhost:2368/ghost/api/v3/content/posts/?key=8e4e35b5782e30f8d120cdee6b&include=tags&filter=tag:landscape"
    );
    dataLandscape.then(x => (this.$data.landscape = x.data.posts[0]));
    const dataFruits = axios.get(
      "http://localhost:2368/ghost/api/v3/content/posts/?key=8e4e35b5782e30f8d120cdee6b&include=tags&filter=tag:fruits"
    );
    dataFruits.then(x => (this.$data.fruits = x.data.posts[0]));
    const dataTurtle = axios.get(
      "http://localhost:2368/ghost/api/v3/content/posts/?key=8e4e35b5782e30f8d120cdee6b&include=tags&filter=tag:turtle"
    );
    dataTurtle.then(x => (this.$data.turtle = x.data.posts[0]));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.image {
  width: 33vw;
  &:hover {
    filter: grayscale(100%) blur(2px) contrast(40%);
  }
}
.txt-on-image {
  opacity: 0;
  position: relative;
  bottom: 50%;
  color: aliceblue;
}
.img:hover {
  .txt-on-image {
    opacity: 1;
  }
}
.all-images {
  display: flex;
}
</style>
