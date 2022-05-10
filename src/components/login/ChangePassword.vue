<template>
  <form @submit="onSubmitChangePassword" class="form">
    <img alt="Nachhilfeboerse logo" src="@/assets/Nachhilfeboerse_Logo.png" />

    <div class="error" v-if="showErrorMsg">Es ist ein Fehler aufgetreten</div>
    <input
      type="password"
      v-model="oldPassword"
      name="oldPassword"
      placeholder="Altes Passwort"
    />
    <input
      type="password"
      v-model="newPassword"
      name="newPassword"
      placeholder="Neues Passwort"
    />

    <input
      type="password"
      v-model="newPasswordRepeated"
      name="newPasswordRepeated"
      placeholder="Neues Passwort wiederholen"
    />

    <button type="submit">Passwort ändern</button>
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
  name: "ChangePassword",
  emits: ["newComponent"],
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeated: "",
      showErrorMsg: false,
    };
  },
  methods: {
    onSubmitChangePassword(e: Event) {
      e.preventDefault();

      if (this.newPassword == this.newPasswordRepeated) {
        this.showErrorMsg = false;
        postData(
          API_URL +
            "changePassword?token=" +
            store.state.token +
            "&username=" +
            store.state.user,
          { oldPassword: this.oldPassword, newPassword: this.newPassword }
        ).then((res) => {
          if (res.status) {
            this.$emit("newComponent", "RegisterComponent");
          } else {
            this.showErrorMsg = true;
          }
        });
      } else {
        this.showErrorMsg = true;
      }
    },
  },
});
</script>




<style scoped src="@/styles/Login.css"></style>