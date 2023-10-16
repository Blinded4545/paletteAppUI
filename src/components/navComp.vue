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
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-information"
          title="About"
          value="about"
          @click="about"
          v-bind:active="aboutActive"
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
      aboutActive: false,
    };
  },
  methods: {
    generator() {
      this.$router.push("/home");
    },
    savedPalettes() {
      this.$router.push("/savedPalettes");
    },
    about() {
      this.$router.push("/about");
    },
    logOut() {
      this.$cookies.remove("UserSession");
      this.$router.push("/");
    },
  },
  created() {
    if (window.location.href.match("/home")) {
      this.generActive = true;
      this.savedActive = false;
      this.aboutActive = false;
    }
    if (window.location.href.match("/savedPalettes")) {
      this.savedActive = true;
      this.generActive = false;
      this.aboutActive = false;
    }
    if (window.location.href.match("/about")) {
      this.aboutActive = true;
      this.savedActive = false;
      this.generActive = false;
    }
  },
};
</script>

<style>
#logOut {
  padding-left: 0.5rem;
  transition: all 0.5s ease;
}
#logOut:hover {
  background-color: lightgray;
  border-radius: 5px;
}
</style>
