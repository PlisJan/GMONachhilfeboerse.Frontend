<template>
  <table class="menuBar">
    <tr>
      <th
        class="txtBtn"
        :class="{ active: currentComponent == 'HomeComponent' }"
      >
        <div @click="changeComponent('HomeComponent')">Home</div>
      </th>
      <th
        class="txtBtn"
        :class="{ active: currentComponent == 'GiveLessonsComponent' }"
      >
        <div @click="changeComponent('GiveLessonsComponent')">
          Nachhilfe geben
        </div>
      </th>
      <th
        class="txtBtn"
        :class="{ active: currentComponent == 'TakeLessonsComponent' }"
      >
        <div @click="changeComponent('TakeLessonsComponent')">
          Nachhilfe nehmen
        </div>
      </th>

      <th></th>

      <th class="imgBtn dropdown" v-if="isAdmin">
        <img src="@/assets/ICO_admin.png" alt="Admin" />
        <div class="dropdown-content">
          <a @click="changeComponent('ImportUsersComponent')">Benutzer</a>
          <a href="/config">Konfiguration</a>
          <a @click="changeComponent('MatchComponent')">Zuordnen</a>
        </div>
      </th>

      <th class="imgBtn dropdown">
        <img src="@/assets/ICO_settings.png" alt="Settings" />
        <div class="dropdown-content">
          <a @click="changeComponent('SettingsComponent')">Einstellungen</a>
          <a @click="changeComponent('ImprintComponent')">Impressum</a>
          <a @click="changeComponent('ContactComponent')">Kontakt</a>
        </div>
      </th>
      <th class="imgBtn" @click="logout">
        <img src="@/assets/ICO_Logout.png" alt="Logout" />
      </th>
    </tr>
  </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { store } from "@/helper/store";
import { API_URL, getData } from "@/helper/WebApiHelper";

const naviPages = {
  HomeComponent: "/",
  GiveLessonsComponent: "/",
  TakeLessonsComponent: "/",
  SettingsComponent: "/",
  ImprintComponent: "/impressumcontact",
  ContactComponent: "/impressumcontact",
  ImportUsersComponent: "/admin",
  MatchComponent: "/admin",
};

const standardPage: { [key: string]: NaviPage } = {
  "/": "HomeComponent",
  "/impressumcontact": "ImprintComponent",
  "/admin": "ImportUsersComponent",
};

type NaviPage =
  | "HomeComponent"
  | "GiveLessonsComponent"
  | "TakeLessonsComponent"
  | "SettingsComponent"
  | "ImprintComponent"
  | "ContactComponent"
  | "ImportUsersComponent"
  | "MatchComponent";

export default defineComponent({
  name: "MenuBar",
  emits: ["changedComponent"],

  data() {
    return {
      currentComponent: store.getters.getCurrentComponent,
      isAdmin: false,
    };
  },
  async created() {
    this.getIsAdmin();
    if (
      naviPages[store.getters.getCurrentComponent as NaviPage] !=
      this.$route.path
    ) {
      this.changeComponent(
        standardPage[this.$route.path as "/" | "/impressumcontact"]
      );
    }
  },

  methods: {
    changeComponent(newComponent: NaviPage) {
      store.dispatch("changeComponent", newComponent);
      this.currentComponent = newComponent;
      const changePage = naviPages[newComponent] != this.$route.path;
      if (changePage) {
        this.$emit("changedComponent", naviPages[newComponent]);
      } else {
        this.$emit("changedComponent", null);
      }
    },
    getIsAdmin() {
      getData(
        API_URL +
          "isAdmin?token=" +
          store.state.token +
          "&username=" +
          store.state.user
      ).then((res) => (this.isAdmin = res.isAdmin));
    },
    logout() {
      getData(
        API_URL +
          "logout?token=" +
          store.state.token +
          "&username=" +
          store.state.user
      );
      store.dispatch("logout");
      this.$router.push("/login");
    },
  },
});
</script>


<style scoped src="@/styles/Main.css">
</style>