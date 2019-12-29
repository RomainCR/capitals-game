<template>
  <div class="about">
    <CapitalTest />
  </div>
</template>

<script>
// @ is an alias to /src
import CapitalTest from "@/components/CapitalTest.vue";

export default {
  name: "home",
  components: {
    CapitalTest
  }
};
</script>
