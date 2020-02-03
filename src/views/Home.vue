<template>
  <div class="home">
    <HelloWorld2 />
    <Ghost />
  </div>
</template>

<script>
// @ is an alias to /src
import Ghost from "@/components/Ghost.vue";
import HelloWorld2 from "@/components/HelloWorld2.vue";

export default {
  name: "home",
  components: {
    HelloWorld2,
    Ghost
  }
};
</script>
