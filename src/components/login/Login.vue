<template>
  <form @submit="onSubmitLogin" class="form">
    <img alt="Nachhilfeboerse logo" src="@/assets/Nachhilfeboerse_Logo.png" />

    <div class="error" v-if="wrongPW">Benutzername oder Passwort falsch</div>
    <input
      type="text"
      v-model="username"
      name="username"
      placeholder="Benutzername"
    />

    <input
      type="password"
      v-model="password"
      name="password"
      placeholder="Passwort"
    />

    <button type="submit">Anmelden</button>
  </form>
  <footer>
    <a @click="changeMainComponent('ImprintComponent');this.$router.push('/impressumcontact')" href="#"
      >Impressum
    </a>
    <a
      @click="changeMainComponent('ContactComponent');this.$router.push('/impressumcontact')"
      href="#"
    >
      Kontakt</a
    >
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AuthService from "@/helper/AuthService";
import { store } from "@/helper/store";

export default defineComponent({
  name: "Login",
  emits: ["newComponent"],
  data() {
    return {
      username: "",
      password: "",
      wrongPW: false,
    };
  },
  async created() {
    if (store.getters.isLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    async onSubmitLogin(e: Event) {
      e.preventDefault();

      const response = await AuthService.login({
        username: this.username,
        password: this.password,
      });

      const token = response.token;
      const user = response.user;
      if (response.status) {
        store.dispatch("login", { token, user });
        console.log(response.firstlogin);
        if (response.firstlogin) {
          this.$emit("newComponent", "ChangePasswordComponent");
        } else {
          this.$router.push("/");
        }
      } else {
        this.wrongPW = true;
      }
    },
    changeMainComponent(newComponent: string) {
      store.dispatch("changeComponent", newComponent);
    },
  },
});
</script>
<style scoped src="@/styles/Login.css"></style>
