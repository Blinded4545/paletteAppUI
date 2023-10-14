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
            <button @click="savePalette">Save Palette</button>
          </div>
        </div>
      </div>
    </div>
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
    };
  },

  methods: {
    updateColor(eventData) {
      this.currentColor = eventData["cssColor"];
      this.colorPalette[0] = this.currentColor;
    },
    generatePalette() {},
    savePalette() {},
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
