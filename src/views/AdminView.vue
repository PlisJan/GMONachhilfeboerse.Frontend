<template>
  <div class="webBody">
    <MenuBar @changedComponent="changeComponent" />
    <ImportUsersComponent v-if="currentComponent == 'ImportUsersComponent'" />
    <MatchComponent v-if="currentComponent == 'MatchComponent'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ImportUsersComponent from "@/components/admin/ImportUsersComponent.vue";
import MatchComponent from "@/components/admin/MatchComponent.vue";
import MenuBar from "@/components/MenuBar.vue";

import { store } from "@/helper/store";

export default defineComponent({
  name: "Home",
  components: {
    MenuBar,
    ImportUsersComponent,
    MatchComponent,
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