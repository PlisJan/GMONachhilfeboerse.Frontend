<template>
  <div class="webBody">
    <MenuBar v-if="showNavBar" @changedComponent="changeComponent" />

    <ImprintComponent v-if="currentComponent == 'ImprintComponent'" />
    <ContactComponent v-if="currentComponent == 'ContactComponent'" />
    <a href="#" @click="this.$router.push('/login')" v-if="!showNavBar"><button class="btn">Login</button></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ImprintComponent from "@/components/Imprint.vue";
import ContactComponent from "@/components/Contact.vue";
import MenuBar from "@/components/MenuBar.vue";
import { store } from "@/helper/store";

export default defineComponent({
  name: "Imprint",
  components: {
    MenuBar,
    ImprintComponent,
    ContactComponent,
  },
  data() {
    return {
      showNavBar: store.getters.isLoggedIn,
      currentComponent: store.getters.getCurrentComponent,
    };
  },
  async created() {
    if (
      !["ContactComponent", "ImprintComponent"].includes(
        store.getters.getCurrentComponent
      )
    ) {
      store.dispatch("changeComponent", "ImprintComponent");
      this.currentComponent = "ImprintComponent";
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

<style scoped src="@/styles/Main.css">
</style>
