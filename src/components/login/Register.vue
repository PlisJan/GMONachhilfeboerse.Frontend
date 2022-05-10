<template>
  <form @submit="onSubmitRegister" class="form">
    <img alt="Nachhilfeboerse logo" src="@/assets/Nachhilfeboerse_Logo.png" />

    <input
      type="text"
      v-model="fullName"
      name="fullName"
      pattern="[A-zÀ-ž]+ [A-zÀ-ž]+"
      placeholder="Name"
      title="Vorname Nachname"
      required
    />
    <input
      type="email"
      v-model="email"
      name="email"
      pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
      title="max.mustermann@gmail.com"
      placeholder="E-Mail Adresse"
      required
    />
    <input
      type="tel"
      name="phonenumber"
      v-model="phonenumber"
      pattern="[+0-9 /\-]+"
      title="+49 1234 1234567"
      placeholder="Telefonnummer (optional)"
    />

    <button type="submit">Registrierung Abschließen</button>
  </form>
  <footer>
    <a href="/impressumcontact">Impressum</a> <a href="/kontakt">Kontakt</a>
  </footer>
</template>

<script lang="ts">
import { API_URL, postData } from "@/helper/WebApiHelper";
import { defineComponent } from "vue";
import { store } from "@/helper/store";
export default defineComponent({
  name: "Register",
  data() {
    return {
      fullName: "",
      email: "",
      phonenumber: "",
    };
  },
  methods: {
    onSubmitRegister(e: Event) {
      e.preventDefault();
      postData(
        API_URL +
          "addPeronalData?token=" +
          store.state.token +
          "&username=" +
          store.state.user,
        {
          name: this.fullName,
          email: this.email,
          phonenumber: this.phonenumber,
        }
      );
      this.$router.push("/");
      //   console.log(this.password);
    },
  },
});
</script>

<style scoped src="@/styles/Login.css"></style>
