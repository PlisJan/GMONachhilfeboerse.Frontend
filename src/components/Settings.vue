<template>
  <div class="content">
    <h1>Einstellungen</h1>

    <table>
      <tr>
        <th>Passwort</th>
        <td>
          <input
            class="IN_changePW"
            type="text"
            value="&bullet;&bullet;&bullet;&bullet;&bullet;&bullet;&bullet;&bullet;"
            v-if="showChangeField != 'Password'"
            disabled
          />
          <input
            class="IN_changePW"
            type="password"
            placeholder="Altes Passwort"
            v-if="showChangeField == 'Password'"
            v-model="oldPassword"
          />
          <input
            class="IN_changePW"
            type="password"
            placeholder="Neues Passwort"
            v-if="showChangeField == 'Password'"
            v-model="newPassword"
          />
          <input
            class="IN_changePW"
            type="password"
            placeholder="Wiederholung Neues Passwort"
            v-if="showChangeField == 'Password'"
            v-model="newPasswordRepeated"
          />
        </td>
        <td class="btnCell">
          <input
            class="btn"
            :class="{ error: showErrorMsg }"
            type="button"
            value="OK"
            @click="changePassword"
            v-if="showChangeField == 'Password'"
          />
        </td>

        <td class="btnCell">
          <button
            type="button"
            class="changeBTN"
            @click="toggleChange('Password')"
          >
            <span v-if="showChangeField != 'Password'">Ändern</span>
            <span v-if="showChangeField == 'Password'">Abbrechen</span>
          </button>
        </td>
      </tr>
      <tr>
        <th>Email</th>
        <td>
          <input
            type="text"
            pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
            name="IN_email"
            id="IN_email"
            v-model="email"
            :disabled="showChangeField != 'Email'"
          />
        </td>
        <td class="btnCell">
          <input
            class="btn"
            type="button"
            value="OK"
            @click="changePersonalData('Email')"
            :hidden="showChangeField != 'Email'"
          />
        </td>

        <td class="btnCell">
          <button
            type="button"
            class="changeBTN"
            id="CBTN_email"
            @click="toggleChange('Email')"
          >
            <span v-if="showChangeField != 'Email'">Ändern</span>
            <span v-if="showChangeField == 'Email'">Abbrechen</span>
          </button>
        </td>
      </tr>
      <tr>
        <th>Telefon</th>
        <td>
          <input
            type="text"
            pattern="[+0-9 /\-]+"
            name="tel"
            id="IN_tel"
            v-model="tel"
            :disabled="showChangeField != 'Tel'"
          />
        </td>
        <td class="btnCell">
          <input
            class="btn"
            type="button"
            value="OK"
            @click="changePersonalData('Tel')"
            :hidden="showChangeField != 'Tel'"
          />
        </td>
        <td class="btnCell">
          <button
            type="button"
            class="changeBTN"
            id="CBTN_tel"
            @click="toggleChange('Tel')"
          >
            <span v-if="showChangeField != 'Tel'">Ändern</span>
            <span v-if="showChangeField == 'Tel'">Abbrechen</span>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { API_URL, getData, postData } from "@/helper/WebApiHelper";
import { store } from "@/helper/store";

export default defineComponent({
  name: "SettingsComponent",

  data() {
    return {
      showChangeField: "" as "Password" | "Email" | "Tel" | "",
      oldPassword: "",
      newPassword: "",
      newPasswordRepeated: "",
      showErrorMsg: false,
      email: "",
      tel: "",
    };
  },
  mounted() {
    this.getPersonalData();
  },
  methods: {
    getPersonalData() {
      getData(
        API_URL +
          "getPersonalData?token=" +
          store.state.token +
          "&username=" +
          store.state.user
      ).then((res) => {
        this.email = res.email;
        this.tel = res.tel;
      });
    },

    toggleChange(field: "Password" | "Email" | "Tel") {
      if (this.showChangeField != field) {
        this.showChangeField = field;
      } else {
        this.showChangeField = "";
      }
    },
    changePersonalData(toChange: "Email" | "Tel") {
      postData(
        API_URL +
          "changePersonalData?token=" +
          store.state.token +
          "&username=" +
          store.state.user,
        { toChange: toChange, email: this.email, tel: this.tel }
      ).then((res) => {
        if (res.status) {
          this.showChangeField = "";
          this.getPersonalData();
        } else {
          this.showErrorMsg = true;
        }
      });
    },
    changePassword() {
      console.log(this.newPassword, this.newPasswordRepeated, this.oldPassword);
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
            this.showChangeField = "";
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


<style scoped>
input,
select {
  font-family: "Century Gothic", sans-serif;
  outline: 0;
  background: var(--backgroundLight);
  width: 100%;
  border: 0;
  height: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  margin-left: 0;
  margin-right: 0;
  height: var(--standardHeight);
  width: 60%;
  text-align: center;
}
input:disabled {
  background: var(--formBackground);
  color: var(--textDark);
}
h1 {
  font-size: 2vw;
  text-align: center;
}
.content {
  padding: 20px;
}

table {
  table-layout: fixed;
  background-color: var(--formBackground);
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
}

table * {
  white-space: normal;
  word-wrap: break-word;
}

table th {
  background-color: var(--accentGreen);
  border: none;
  width: 15%;
}

.btnCell {
  width: 12%;
}
button,
.btn {
  text-transform: uppercase;
  text-align: center;
  outline: 0;
  background: var(--accentGreen);
  width: 100%;
  border: 0;
  color: var(--textLight);
  font-size: 14px;
  height: var(--standardHeight);
  margin-top: var(--standardMarginVertical);
  /*noinspection CssInvalidPropertyValue*/
  cursor: pointer;
}

td {
  text-align: center;
  vertical-align: middle;
}
button:hover,
.btn:hover {
  background: var(--accentGreenHover);
}
.BTN_Delete {
  background: var(--warnRed);
  width: 50%;
}
.BTN_Delete:hover {
  background: var(--warnRedHover);
}
.IN_changePW {
  margin-top: var(--standardMarginVertical);
  width: 30%;
  margin-left: 1%;
}
.error {
  border: 3px red solid;
}
</style>