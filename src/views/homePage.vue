<template>
  <div id="bgWrapper">
    <div id="navContainer">
      <navComp id="navComponent" />
    </div>
    <div id="rWrapper">
      <div id="colorPick">
        <ColorPicker
          class="ColorPick"
          :color="randColor"
          @color-change="updateColor"
          alpha-channel="hide"
          default-format="hex"
          :visible-formats="['rgb', 'hex']"
          hue-range-input-label="'a'"
        />
        <div id="colorSwatch">
          <div id="paletteTitle">
            <h2>Color Palette</h2>
          </div>
          <div id="colors">
            <div
              v-for="(i, k) in colorPalette"
              :key="k"
              class="colorBox"
              :style="{ 'background-color': i }"
            ></div>
            <!--Implement clipboard Function--->
          </div>
          <div id="generateBtn">
            <button @click="generatePalette">Generate new palette</button>
          </div>
          <div id="saveBtn">
            <button @click="showOverlay">Save Palette</button>
          </div>
        </div>
      </div>
    </div>
    <v-overlay
      id="saveName"
      v-model="overlay"
      scrim="rgba(150, 150, 150, 0.6)"
      style="backdrop-filter: blur(20px)"
      class="align-center justify-center"
    >
      <div
        style="
          background-color: rgba(200, 200, 200, 1);
          height: 15rem;
          display: grid;
          border-radius: 20px;
        "
        class="justify-center align-center"
      >
        <div style="padding-top: 3rem">
          <input
            class="form"
            placeholder="Name"
            v-model="name"
            style="display: block; margin-bottom: 0"
          />
        </div>
        <div style="margin-top: 1rem; margin-bottom: 3rem">
          <button
            class="btn"
            @click="savePalette"
            style="
              margin-left: 23%;
              font-size: 1.3rem;
              margin-top: 0;
              background-color: rgb(252, 169, 234);
            "
          >
            Save Palette
          </button>
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import { ColorPicker } from "vue-accessible-color-picker";
import navComp from "@/components/navComp.vue";

export default {
  name: "homePage",
  components: {
    ColorPicker,
    navComp,
  },
  data() {
    return {
      randColor: "",
      currentColor: "",
      colorPalette: ["#6d2b29", "#b78b49", "#e8ae6c", "#d4a86b", "#5b5837"],
      name: "",
      overlay: false,
    };
  },

  methods: {
    updateColor(eventData) {
      this.currentColor = eventData["cssColor"];
      this.colorPalette[0] = this.currentColor;
    },
    generatePalette() {
      fetch("http://192.168.1.8:3000/generate", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ color: this.currentColor }),
      }).then((response) => {
        response.json().then((data) => {
          this.colorPalette = [
            data[0]["value"],
            data[1]["value"],
            data[2]["value"],
            data[3]["value"],
            data[4]["value"],
          ];
          this.currentColor = data[0]["value"];
          console.log(data);
        });
      });
    },
    showOverlay() {
      this.overlay = true;
    },
    savePalette() {
      console.log(this.name);
      fetch("http://192.168.1.8:3000/postPalettes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          usr: this.$cookies.get("UserSession"),
          colors: this.colorPalette,
          name: this.name,
        }),
      });
      this.name = "";
      this.overlay = false;
    },
  },

  created() {
    let codeList = "0123456789ABCDEF";
    let randNumb;
    this.randColor = "#";
    for (let i = 0; i < 6; i++) {
      randNumb = Math.floor(Math.random() * 16777215) % codeList.length;
      this.randColor += codeList[randNumb];
    }
    this.colorPalette[0] = this.randColor;
  },
};
</script>

<style>
html {
  width: 100%;
  height: 100%;
}
#bgWrapper {
  margin: 0;
  /* text-align: center; */
  min-width: 100%;
  width: fit-content;
  height: 100vh;
  background-image: linear-gradient(0deg, #072541, #5272f2);
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
  grid-template-rows: calc(5rem - 20px) auto;
  grid-template-areas: "nav" "content";
  display: grid;
}

#navContainer {
  grid-area: nav;
  display: flex;
  justify-self: start;
}
#navComponent {
  text-align: left;
  height: fit-content;
}

#rWrapper {
  grid-area: content;
  text-align: center;
  width: fit-content;
  display: grid;
  align-items: center;
  justify-items: center;
  margin-bottom: 5rem;
}

.ColorPick {
  border-radius: 10px;
  margin: 1rem;
  width: 15rem;
  background-color: rgb(255, 255, 255, 0);
}
.ColorPick > * {
  border-radius: 10px;
}

#colorPick {
  width: fit-content;
  max-height: fit-content;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(30px);
  border-radius: 10px;
  margin: 4rem;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: auto;
}

#colorSwatch {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "title"
    "1"
    "button"
    "save";
}

#paletteTitle {
  grid-area: title;
}

.colorBox {
  display: inline-block;
  margin: 0.5rem;
  padding: 1rem;
  margin-top: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50px;
  transition: all 0.1s ease;
}
.colorBox:hover {
  width: 2.5rem;
  height: 2.5rem;
}

#generateBtn {
  grid-area: button;
  padding-top: 3rem;
  padding-bottom: 2rem;
  border-radius: 10px;
  padding: 0;
}

#generateBtn > button {
  border: none;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  font-size: 1rem;
  transition: all 0.2s ease;
}
#generateBtn > button:hover {
  transform: scale(1.2);
}

#saveBtn {
  grid-area: save;
  padding-top: 3rem;
  padding-bottom: 2rem;
  border-radius: 10px;
  padding: 0;
}

#saveBtn > button {
  border: none;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  font-size: 1rem;
  transition: all 0.2s ease;
}
#saveBtn > button:hover {
  transform: scale(1.2);
}

/********** MEDIA QUERY **********/
@media (min-width: 642px) {
  #bgWrapper {
    overflow: hidden;
    margin: 0;
    /* text-align: center; */
    min-width: 100%;
    width: fit-content;
    height: 100vh;
    background-image: linear-gradient(0deg, #072541, #5272f2);
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: center;
    grid-template-rows: calc(5rem - 20px) auto;
    grid-template-areas: "nav" "content";
    display: grid;
  }

  #navContainer {
    grid-area: nav;
    display: flex;
    justify-self: start;
  }
  #navComponent {
    text-align: left;
    height: fit-content;
  }

  #rWrapper {
    grid-area: content;
    text-align: center;
    width: fit-content;
    display: grid;
    align-items: center;
    justify-items: center;
    margin-bottom: 5rem;
  }

  #colorPick {
    width: fit-content;
    max-height: fit-content;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    margin: 4rem;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: auto auto;
  }

  #colorSwatch {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto 1fr 1fr;
    grid-template-areas:
      "title"
      "1"
      "button"
      "save";
    margin-right: 22px;
    align-items: center;
    justify-items: center;
  }

  #paletteTitle {
    grid-area: title;
    margin-top: 1rem;
  }

  .colorBox {
    display: inline-block;
    margin: 0.5rem;
    /* padding: 1rem; */
    margin-top: 2rem;
    max-width: 2.5rem;
    max-height: 2.5rem;
    border-radius: 50px;
    transition: all 0.1s ease;
  }
  .colorBox:hover {
    width: 2.5rem;
    height: 2.5rem;
  }

  #generateBtn {
    grid-area: button;
    margin-top: 3rem;
    border-radius: 10px;
  }

  #generateBtn > button {
    border: none;
    font-size: 1rem;
    transition: all 0.2s ease;
    border-radius: 20px;
    /* padding: 5px; */
  }
  #generateBtn > button:hover {
    transform: scale(1.2);
  }

  #saveBtn {
    grid-area: save;
    border-radius: 10px;
    margin: 0;
    padding: 1rem;
  }

  #saveBtn > button {
    border: none;
    font-size: 1rem;
    transition: all 0.2s ease;
    border-radius: 20px;
    padding: 5px;
  }
  #saveBtn > button:hover {
    transform: scale(1.2);
  }
}
</style>
