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
            value="Als PDF"
            @click="getStartPasswordsPDF"
          />
          <input
            class="btn middleBtn"
            type="button"
            value="Als CSV"
            @click="getStartPasswordsCSV"
          />
        </td>
        <td class="btnCell"></td>

        <td class="btnCell"></td>
      </tr>
    </table>
    <div
      class="msg"
      :class="{ error: msgType == 'error' }"
      v-if="msgTitle != ''"
    >
      <h2>{{ msgTitle }}</h2>
      <span v-html="msg"></span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import jsPDF from "jspdf";

import { API_URL, getData, postData } from "@/helper/WebApiHelper";
import { store } from "@/helper/store";
import { throwStatement } from "@babel/types";

const notes = "Link: https://nachhilfeboerse.gymnasium.oberstadt.de";

export default defineComponent({
  name: "ImportUsersComponent",

  data() {
    return {
      importData: {},
      msg: "",
      msgTitle: "",
      msgType: "success" as "success" | "error",
    };
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
    getStartPasswordsPDF() {
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
    getStartPasswordsCSV() {
      getData(
        API_URL +
          "getStartPasswords?token=" +
          store.state.token +
          "&username=" +
          store.state.user
      ).then((res) => {
        let csv = "Klasse,Benutzername,Startpasswort,Notizen\n";
        for (const key in res) {
          res[key].forEach(
            (element: { username: string; startPassword: string }) => {
              csv +=
                key +
                "," +
                element.username +
                "," +
                element.startPassword +
                "," +
                notes +
                "\n";
            }
          );
        }

        const anchor = document.createElement("a");
        anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        anchor.target = "_blank";
        anchor.download = "Startpasswords.csv";
        anchor.click();
      });
    },
    async importUser() {
      if (this.importData != {}) {
        let returnData: { status?: string; ignored?: string[] } | undefined =
          undefined;
        try {
          returnData = await postData(
            API_URL +
              "importUsers?token=" +
              store.state.token +
              "&username=" +
              store.state.user,
            this.importData
          );
        } catch (error) {
          this.msgTitle = "Import fehlgeschlagen!";
          this.msg = "";
          this.msgType = "error";
          return;
        }

        if (returnData.status == "imported") {
          this.msgType = "success";
          this.msgTitle = "Import erfolgreich!";
          if (
            returnData.ignored != undefined &&
            returnData.ignored.length > 0
          ) {
            this.msg = `<p>Es wurden die Personen</p>
              <p><strong>${returnData.ignored?.join(", ")}</strong></p>
              <p>übersprungen!</p>`;
          } else {
            this.msg = `<p>Es wurden <strong>alle</strong> Personen importiert</p>`;
          }
        } else {
          this.msgType = "error";
          this.msg = "";
          this.msgTitle = "Import fehlgeschlagen!";
        }
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
  width: 30%;
}
.msg {
  padding-top: 0.5vh;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-bottom: 0.5vh;
  border-width: 2px;
  border-style: solid;
  border-radius: 2px;
  background-color: rgba(76, 175, 80, 0.56);
  border-color: rgb(8, 127, 35);
  margin-top: 1vh;
  text-align: center;
}
.error {
  background-color: rgba(255, 0, 0, 0.56);
  border-color: rgb(143, 0, 0);
  color: #1f3143;
}
</style>