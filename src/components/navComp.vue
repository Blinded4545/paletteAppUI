<template>
  <nav>
    <v-navigation-drawer app expand-on-hover rail style="" id="drawer">
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-menu" value="colorUI" style="width=10rem"
          >Color UI</v-list-item
        >
        <v-list-item
          prepend-icon="mdi-brush"
          title="Generator"
          value="gen"
          @click="generator"
          v-bind:active="generActive"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-palette"
          title="Saved Palettes"
          value="colorUI"
          @click="savedPalettes"
          v-bind:active="savedActive"
          id="saveP"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
            id="logOut"
            @click="logOut"
          ></v-list-item>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      savedActive: false,
      generActive: false,
    };
  },
  methods: {
    generator() {
      this.$router.push("/home");
    },
    savedPalettes() {
      this.$router.push("/savedPalettes");
    },
    logOut() {
      this.$router.push("/");
    },
  },
  created() {
    console.log(typeof window.location.href);
    if (window.location.href.match("/home")) {
      console.log("home");
      this.generActive = true;
      this.savedActive = false;
    }
    if (window.location.href.match("/savedPalettes")) {
      console.log("saved");
      this.savedActive = true;
      this.generActive = false;
    }
  },
};
</script>

<style>
#logOut {
  transition: all 0.5s ease;
}
#logOut:hover {
  background-color: lightgray;
  border-radius: 5px;
}
</style>
