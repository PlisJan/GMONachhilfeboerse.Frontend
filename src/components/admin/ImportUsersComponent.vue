<template>
  <div class="content">
    <h1>Benutzer</h1>

    <table>
      <tr>
        <th>Benutzer importieren</th>
        <td>
          <input
            type="file"
            name="IN_name"
            id="IN_name"
            ref="doc"
            accept="text/csv,application/csv,"
            @change="readFile"
          />
        </td>
        <td class="btnCell">CSV-File Format: Klasse,Username</td>

        <td class="btnCell">
          <button
            type="button"
            class="changeBTN"
            id="CBTN_name"
            @click="importUser"
          >
            Importieren
          </button>
        </td>
      </tr>
      <tr>
        <th>Startpasswörter abrufen</th>
        <td>
          <input
            class="btn middleBtn"
            type="button"
            value="Startpassöwrter als PDF herunterladen"
            @click="getStartPasswords"
          />
        </td>
        <td class="btnCell"></td>

        <td class="btnCell"></td>
      </tr>
      <!-- <tr>
        <th>Telefon</th>
        <td>
          <input
            type="text"
            pattern="[+0-9 /\-]+"
            name="tel"
            id="IN_tel"
            value="{personal_data.phonenumber}"
            disabled
          />
        </td>
        <td class="btnCell">
          <input class="btn" id="SUBMIT_tel" type="submit" value="OK" hidden />
        </td>
        <td class="btnCell">
          <button
            type="button"
            class="changeBTN"
            id="CBTN_tel"
            onclick="editBTN_Click(this)"
          >
            Ändern
          </button>
        </td>
      </tr> -->
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import jsPDF from "jspdf";

import { API_URL, getData, postData } from "@/helper/WebApiHelper";
import { store } from "@/helper/store";

const notes = "Link: https://nachhilfeboerse.gymnasium.oberstadt.de";

export default defineComponent({
  name: "ImportUsersComponent",

  data() {
    return { importData: {} };
  },

  methods: {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    readFile(ev: any) {
      const reader = new FileReader();
      if (ev != null && ev.target != null) {
        const file = ev.target.files[0];
        reader.onload = (e) => {
          if (e != null && e.target != null && e.target.result) {
            let data = e.target.result.toString().split("\n");
            let res: { [name: string]: string[] } = {};
            data.forEach((element) => {
              let splitted: Array<string> = element.split(",");
              if (splitted[0] in res) {
                res[splitted[0]].push(splitted[1]);
              } else {
                res[splitted[0]] = [splitted[1]];
              }
            });
            this.importData = res;
          }
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(file);
      }
    },
    getStartPasswords() {
      getData(
        API_URL +
          "getStartPasswords?token=" +
          store.state.token +
          "&username=" +
          store.state.user
      ).then((res) => {
        const doc = new jsPDF();
        for (const key in res) {
          doc.setFontSize(18);
          doc.setFont("times", "bold");
          doc.text(key, 105, 10);
          let txt = "";
          res[key].forEach(
            (element: { username: string; startPassword: string }) => {
              txt +=
                element.username +
                ":       " +
                element.startPassword +
                "     " +
                notes +
                "\n\n";
            }
          );
          doc.setFontSize(10);
          doc.setFont("times", "normal");
          doc.text(txt, 10, 28);
          doc.addPage();
        }

        doc.save("Startpasswords.pdf");
      });
    },
    importUser() {
      if (this.importData != {}) {
        postData(
          API_URL +
            "importUsers?token=" +
            store.state.token +
            "&username=" +
            store.state.user,
          this.importData
        );
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

input[type="file"] {
  text-align: left;
}
input[type="file"]::file-selector-button {
  text-transform: uppercase;
  text-align: center;
  outline: 0;
  background: var(--accentGreen);
  width: 30%;
  border: 0;
  color: var(--textLight);
  font-size: 14px;
  height: var(--standardHeight);
  margin-top: 0;
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
.middleBtn {
  width: 60%;
}
</style>