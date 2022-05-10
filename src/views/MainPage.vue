<template>
  <div class="webBody">
    <MenuBar @changedComponent="changeComponent" />
    <HomeComponent v-if="currentComponent == 'HomeComponent'" />
    <GiveLessonsComponent v-if="currentComponent == 'GiveLessonsComponent'" />
    <TakeLessonsComponent v-if="currentComponent == 'TakeLessonsComponent'" />
    <SettingsComponent v-if="currentComponent == 'SettingsComponent'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeComponent from "@/components/HomeComponent.vue";
import MenuBar from "@/components/MenuBar.vue";
import GiveLessonsComponent from "@/components/GiveLessonsComponent.vue";
import TakeLessonsComponent from "@/components/TakeLessonsComponent.vue";
import SettingsComponent from "@/components/Settings.vue";
import { store } from "@/helper/store";

export default defineComponent({
  name: "Home",
  components: {
    MenuBar,
    HomeComponent,
    GiveLessonsComponent,
    TakeLessonsComponent,
    SettingsComponent,
  },
  data() {
    return {
      currentComponent: store.getters.getCurrentComponent,
    };
  },
  async created() {
    if (!store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
  },

  methods: {
    changeComponent(newPage: string) {
      this.currentComponent = store.getters.getCurrentComponent;
      if (newPage != null) {
        this.$router.push(newPage);
      }
    },
    logout() {
      store.dispatch("logout");
      this.$router.push("/login");
    },
  },
});
</script>

<style  src="@/styles/Main.css">
</style>