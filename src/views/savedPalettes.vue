<template>
  <div class="fullWrapper">
    <navComp id="navComponent" />
    <div id="palettesContainer">
      <div
        v-if="palettesArr.length == 0"
        class="container"
        style="padding-bottom: 2rem"
      >
        <h2>There is not saved palettes</h2>
      </div>
      <div v-else v-for="(i, k) in palettesArr" :key="k" class="container">
        <div
          v-for="(z, j) in i[0]"
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
          icon="mdi-fullscreen"
          style="
            width: fit-content;
            height: fit-content;
            margin-bottom: 2rem;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          "
          @click="expand(k)"
        ></v-btn>
        <v-btn
          icon="mdi-delete"
          style="width: fit-content; height: fit-content; margin-bottom: 2rem"
          @click="remove(k)"
        ></v-btn>
      </div>
    </div>
    <v-overlay
      id="saveScreen"
      v-model="overlay"
      scrim="rgba(150, 150, 150, 0.6)"
      style="backdrop-filter: blur(20px)"
      class="align-center justify-center"
    >
      <div id="selectedPalette">
        <div
          id="organizer"
          style="display: grid; justify-content: center; align-items: center"
        >
          <div
            id="name"
            style="text-align: center; margin-top: 1rem; font-size: 1rem"
          >
            <h3>{{ currentPalette[1] }}</h3>
          </div>
          <div id="colors" style="margin-top: 0.5rem">
            <div
              v-for="(i, k) in currentPalette[0]"
              :key="k"
              style="
                display: grid;
                justify-content: center;
                align-items: center;
                grid-template-columns: auto auto;
                margin: 1rem;
              "
            >
              <div
                :style="{ 'background-color': i }"
                style="
                  margin-right: 1rem;
                  margin-top: 0;
                  width: 3rem;
                  height: 3rem;
                  border-radius: 50px;
                "
              ></div>
              <div
                style="margin-bottom: 0rem; display: inline-block; padding: 0"
              >
                <div
                  style="
                    background-color: rgba(200, 200, 200, 1);
                    padding: 0.2rem;
                    border-radius: 10px;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                  "
                >
                  {{ i }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-overlay>
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
      overlay: false,
      currentPalette: [],
    };
  },
  methods: {
    expand(index) {
      this.currentPalette = [
        this.palettesArr[index][0],
        this.palettesArr[index][1],
      ];
      console.log(this.currentPalette);
      this.overlay = true;
    },

    remove(index) {
      let colorPalette = "";
      this.palettesArr[index][0].forEach((i) => {
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
          usr: this.$cookies.get("UserSession"),
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
      body: JSON.stringify({ usr: this.$cookies.get("UserSession") }),
    }).then((response) => {
      response.json().then((data) => {
        data.forEach((element) => {
          this.palettesArr.push([element[0].split(/\./), element[1]]);
        });
        this.palettesArr.map((elem) => {
          delete elem[0].shift();
        });
      });
    });
  },
};
</script>

<style>
.fullWrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, #072541, #5272f2);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}
#navComponent {
  position: absolute;
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

@media (min-width: 642px) {
  ::-webkit-scrollbar {
    width: 0px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    padding-right: 5rem;
    border-radius: 10px;
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  #body {
    overflow: hidden;
  }
  #palettesContainer {
    margin: 0;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(50px);
    padding: 3rem;
    padding-bottom: 1rem;
    border-radius: 20px;
    max-height: 90vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .container {
    width: fit-content;
  }

  #selectedPalette {
    width: 50vw;
    height: 60vh;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    margin-left: 3.5rem;
  }
}
</style>
