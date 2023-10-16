<template>
  <div class="fullWrapper justify-center align-center">
    <navComp style="position: absolute" />
    <v-container
      style="display: grid; justify-content: center; align-items: center"
    >
      <v-card>
        <v-card-item>
          <v-card-title
            style="text-align: center; padding: 2rem"
            class="text-h2 mb-1"
          >
            Hello!
          </v-card-title>
          <v-card-subtitle class="text-h6 mb-1">
            This page was created with so many effort, it took me roughly 48
            hours or more to create it.
          </v-card-subtitle>
          <v-card-subtitle class="text-h6 mb-1">
            I made it using the following technologies:
          </v-card-subtitle>
          <v-list>
            <v-hover v-slot="{ isHovering, props }">
              <v-list-item
                v-for="(i, k) in list"
                :key="k"
                v-bind="props"
                :class="{ 'on-hover': isHovering }"
              >
                <v-icon icon="mdi-circle-slice-8"></v-icon>
                {{ i }}
              </v-list-item>
            </v-hover>
          </v-list>
          <v-card-subtitle>
            --Camilo Herrera, junior developer--
          </v-card-subtitle>
        </v-card-item>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import navComp from "@/components/navComp.vue";
export default {
  name: "aboutPage",
  components: {
    navComp,
  },
  data() {
    return {
      list: ["Vue.js", "Node.js", "Express", "Sqlite3", "Vuetify"],
    };
  },
};
</script>
