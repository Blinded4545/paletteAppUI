<template>
  <div>
    <navComp />
    <div>
      <div v-for="(i, k) in palettesArr" :key="k">{{ palettesArr[k] }}</div>
    </div>
  </div>
</template>

<script>
import navComp from "@/components/navComp.vue";

export default {
  name: "savedPalettes",
  components: {
    navComp,
  },
  data() {
    return {
      palettesArr: [
        ["a", "b", "c", "d", "e", "f"],
        ["a", "b", "c", "d", "e", "f"],
        ["a", "b", "c", "d", "e", "f"],
      ],
    };
  },
};
</script>
