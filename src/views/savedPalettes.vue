<template>
  <div id="fullWrapper">
    <navComp />
    <div id="palettesContainer">
      <div v-for="(i, k) in palettesArr" :key="k" class="container">
        <div
          v-for="(z, j) in i"
          :key="j"
          :style="{ 'background-color': z }"
          style="
            margin: 0.2rem;
            margin-top: 0;
            width: 2rem;
            height: 2rem;
            border-radius: 20px;
            display: inline-block;
          "
        ></div>
        <v-btn
          icon="mdi-delete"
          style="width: fit-content; height: fit-content; margin-bottom: 2rem"
          @click="remove(k)"
        ></v-btn>
      </div>
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
      palettesArr: [],
    };
  },
  methods: {
    remove(index) {
      let colorPalette = "";
      this.palettesArr[index].forEach((i) => {
        colorPalette += "." + i;
      });

      let a = this.palettesArr[this.palettesArr.length - 1];
      this.palettesArr[this.palettesArr.length - 1] = this.palettesArr[index];
      this.palettesArr[index] = a;

      this.palettesArr.pop();

      console.log(this.palettesArr[index]);
      fetch("http://192.168.1.8:3000/remove", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          usr: "Camilo",
          colors: colorPalette,
        }),
      }).then(() => {
        console.log("trying");
      });
    },
  },
  created() {
    fetch("http://192.168.1.8:3000/getPalettes", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ usr: "Camilo" }),
    }).then((response) => {
      response.json().then((data) => {
        data.forEach((element) => {
          this.palettesArr.push(element.split(/\./));
        });
        this.palettesArr.map((elem) => {
          delete elem.shift();
        });
      });
    });
  },
};
</script>

<style>
#fullWrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, #072541, #5272f2);
  display: grid;
  justify-items: center;
  align-items: center;
}

#palettesContainer {
  margin: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(50px);
  padding: 3rem;
  padding-bottom: 1rem;
  border-radius: 20px;
}

.container {
  width: fit-content;
}
</style>
