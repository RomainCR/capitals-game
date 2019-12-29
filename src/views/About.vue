<template>
  <div class="about">
    <h1>Trouvez la bonne capitale</h1>
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
