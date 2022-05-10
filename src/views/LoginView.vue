<template>
  <LoginComponent
    v-if="currentComponent == 'LoginComponent'"
    @newComponent="changeComponent"
  />
  <RegisterComponent
    v-if="currentComponent == 'RegisterComponent'"
    @newComponent="changeComponent"
  />

  <ChangePasswordComponent
    v-if="currentComponent == 'ChangePasswordComponent'"
    @newComponent="changeComponent"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "@/components/login/Login.vue";
import RegisterComponent from "@/components/login/Register.vue";
import ChangePasswordComponent from "@/components/login/ChangePassword.vue";

export default defineComponent({
  name: "Home",

  components: {
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
  },
  data() {
    return {
      currentComponent: "LoginComponent",
    };
  },
  methods: {
    changeComponent(newComponent: string) {
      this.currentComponent = newComponent;
    },
  },
});
</script>

<style scoped src="@/styles/Login.css"></style>