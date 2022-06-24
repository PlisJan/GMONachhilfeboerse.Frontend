<template>
  <div class="content">
    <table class="overviewTable">
      <tr>
        <th class="smallCell">Vergeben</th>
        <th>Fach</th>
        <th>Zeiten</th>
        <th>Klassenstufe</th>
        <th>Name</th>
        <th>Email</th>
        <th>Telefon</th>
        <th class="smallCell"></th>
      </tr>

      <tr v-for="(data, index) in offers" :key="index">
        <td v-if="data.matched">
          <img class="matchState" src="@/assets/ICO_check.png" alt="Matched" />
        </td>
        <td v-if="!data.matched">
          <img
            class="matchState"
            src="@/assets/ICO_cross.png"
            alt="Not Matched"
          />
        </td>
        <td>{{ subjects[data.subject] }}</td>
        <td>{{ formatTimes(data.times) }}</td>
        <td>{{ data.minClass }}-{{ data.maxClass }}</td>
        <td>{{ data.name }}</td>
        <td>
          <a :href="'mailto:' + data.email">{{ data.email }}</a>
        </td>
        <td>
          <a :href="'tel:' + data.tel">{{ data.tel }}</a>
        </td>
        <td>
          <a v-if="!data.matched">
            <img
              class="matchState deleteBTN"
              src="@/assets/ICO_trash.png"
              alt="Delete"
              @click="delOffer(data.idNum)"
            />
          </a>
        </td>
      </tr>
    </table>
    <div class="fullwidth">
      <button
        id="newOffer"
        name="newOffer"
        class="btn"
        @click="toggleNewOffer()"
      >
        <span v-if="!showNewOffer">Neue Anzeige aufgeben</span>
        <span v-if="showNewOffer">Abbrechen</span>
      </button>
    </div>

    <form
      @submit="onSubmitNewOffer"
      action=""
      class="addEntryForm"
      id="addEntryForm"
      v-if="showNewOffer"
    >
      <table class="overviewTable">
        <tr>
          <th class="smallCell"></th>
          <th>Fach</th>
          <th>Zeiten</th>
          <th>Klassenstufe</th>
          <th>Weitergabe von Daten</th>
          <th></th>
          <th class="smallCell"></th>
          <th></th>
        </tr>
        <tr>
          <td></td>
          <!-- #region Subjects-->
          <td class="subjectsCell">
            <select
              name="subjects"
              class="inp subject"
              v-model="newOffer.subject"
              required
            >
              <option value="" selected disabled>Fach wählen</option>
              <option
                v-for="(subjectName, key) in subjects"
                :key="key"
                :value="key"
              >
                {{ subjectName }}
              </option>
            </select>
          </td>
          <!-- #endregion Subjects-->

          <!-- #region Zeiten-->
          <td
            id="addTimesCell"
            :class="{ wrongInputError: inputErrors.includes('times') }"
          >
            <table class="times">
              <tr>
                <td>
                  <label for="IN_Monday">Mo</label>
                  <input
                    type="text"
                    pattern="[;1-9]+"
                    class="timesInput"
                    name="IN_Monday"
                    placeholder="1;2;5"
                    onchange="this.setCustomValidity('');if(!this.checkValidity()){this.setCustomValidity('Bitte nutze das vorgegebene Format (1;2;5)')}"
                    v-model="newOffer.times.Mo"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="IN_Tuesday">Di</label>
                  <input
                    type="text"
                    pattern="[;1-9]+"
                    class="timesInput"
                    name="IN_Tuesday"
                    placeholder="1;2;5"
                    onchange="this.setCustomValidity('');if(!this.checkValidity()){this.setCustomValidity('Bitte nutze das vorgegebene Format (1;2;5)')}"
                    v-model="newOffer.times.Di"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="IN_Wednesday">Mi</label>
                  <input
                    type="text"
                    pattern="[;1-9]+"
                    class="timesInput"
                    name="IN_Wednesday"
                    placeholder="1;2;5"
                    onchange="this.setCustomValidity('');if(!this.checkValidity()){this.setCustomValidity('Bitte nutze das vorgegebene Format (1;2;5)')}"
                    
                    v-model="newOffer.times.Mi"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="IN_Thursday">Do</label>
                  <input
                    type="text"
                    pattern="[;1-9]+"
                    class="timesInput"
                    name="IN_Thursday"
                    placeholder="1;2;5"
                    onchange="this.setCustomValidity('');if(!this.checkValidity()){this.setCustomValidity('Bitte nutze das vorgegebene Format (1;2;5)')}"
                    v-model="newOffer.times.Do"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="IN_Friday">Fr</label>
                  <input
                    type="text"
                    pattern="[;1-9]+"
                    class="timesInput"
                    name="IN_Friday"
                    placeholder="1;2;5"
                    onchange="this.setCustomValidity('');if(!this.checkValidity()){this.setCustomValidity('Bitte nutze das vorgegebene Format (1;2;5)')}"
                    v-model="newOffer.times.Fr"
                  />
                </td>
              </tr>
            </table>
          </td>
          <!-- #endregion Zeiten-->

          <!--#region Klassenstufe-->
          <td>
            <div class="classLevel">
              <input
                type="number"
                v-model="newOffer.minClass"
                name="minClassLevel"
                min="5"
                max="13"
                placeholder="5"
                class="classLevelInput"
                id="classLevelInputMin"
                required
              />
              <div>-</div>
              <input
                type="number"
                v-model="newOffer.maxClass"
                name="maxClassLevel"
                min="5"
                max="13"
                placeholder="13"
                class="classLevelInput"
                id="classLevelInputMax"
                required
              />
            </div>
          </td>
          <!--#endregion Klassenstufe-->
          <td
            id="passDataCell"
            :class="{ wrongInputError: inputErrors.includes('passData') }"
          >
            <label for="passMail"
              >Meine E-Mail Adresse darf weitergegeben werden</label
            >
            <input
              type="checkbox"
              name="passMail"
              class="passInput"
              v-model="newOffer.allowEmail"
            />
            <label for="passMail" v-if="canUsePhone"
              >Meine Telefonnummer darf weitergegeben werden</label
            >
            <input
              type="checkbox"
              name="passTel"
              class="passInput"
              v-if="canUsePhone"
              v-model="newOffer.allowTel"
            />
            <label v-if="!canUsePhone"
              >Bitte füge zuerst unter Einstellungen eine Telefonnummer hinzu um
              diese zu nutzen.</label
            >
          </td>
          <td></td>
          <td colspan="2">
            <input
              type="submit"
              name="addEntryFormSubmit"
              id="addEntryFormSubmit"
              class="btn"
              value="Anzeige Aufgeben"
            />
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script lang="ts">
import { API_URL, getData, postData } from "@/helper/WebApiHelper";
import { defineComponent } from "vue";
import { store } from "@/helper/store";
export default defineComponent({
  name: "GiveLessonsComponent",

  data() {
    return {
      canUsePhone: false,
      subjects: {},
      showNewOffer: false,
      offers: undefined,
      newOffer: {
        subject: "",
        times: { Mo: "", Di: "", Mi: "", Do: "", Fr: "" },
        allowTel: false,
        allowEmail: false,
        minClass: undefined,
        maxClass: undefined,
      },
      inputErrors: new Array<string>(),
    };
  },
  mounted() {
    this.getOffers();
    getData(API_URL + "getSubjects").then((res) => (this.subjects = res));
    getData(
      API_URL +
        "getPersonalData?token=" +
        store.state.token +
        "&username=" +
        store.state.user
    ).then((res) => {
      this.canUsePhone = res.tel != "";
    });
  },
  methods: {
    toggleNewOffer() {
      this.showNewOffer = !this.showNewOffer;
    },
    getOffers() {
      getData(
        API_URL +
          "getGiveOffers?token=" +
          store.state.token +
          "&username=" +
          store.state.user
      ).then((res) => (this.offers = res.giveOffers));
    },
    delOffer(idNum: number) {
      if (confirm("Diesen Eintrag wirklich löschen?")) {
        postData(
          API_URL +
            "delGiveOffer?token=" +
            store.state.token +
            "&username=" +
            store.state.user,
          { idNum: idNum }
        ).then(() => this.getOffers());
      }
    },
    onSubmitNewOffer(e: Event) {
      e.preventDefault();
      if (!(this.newOffer.allowTel || this.newOffer.allowEmail)) {
        this.inputErrors.push("passData");
      } else {
        const index = this.inputErrors.indexOf("passData", 0);
        if (index > -1) {
          this.inputErrors.splice(index, 1);
        }
      }
      let testLength = 0;
      Object.entries(this.newOffer.times).forEach(([key, value]) => {
        testLength += value.length;
      });
      if (testLength == 0) {
        this.inputErrors.push("times");
      } else {
        const index = this.inputErrors.indexOf("times", 0);
        if (index > -1) {
          this.inputErrors.splice(index, 1);
        }
      }

      if (this.inputErrors.length == 0) {
        postData(
          API_URL +
            "addGiveOffer?token=" +
            store.state.token +
            "&username=" +
            store.state.user,
          this.newOffer
        ).then(() => this.getOffers());
        this.newOffer = {
          subject: "",
          times: { Mo: "", Di: "", Mi: "", Do: "", Fr: "" },
          allowTel: false,
          allowEmail: false,
          minClass: undefined,
          maxClass: undefined,
        };
        this.showNewOffer = false;
      }
    },

    formatTimes(times: any) {
      const sorter = ["Mo", "Di", "Mi", "Do", "Fr"];

      let res = [];
      for (let key in times) {
        let value = times[key];
        if (value != "") {
          res.push(key + ": " + value);
        }
      }

      res.sort(function sortByDay(a, b) {
        let day1 = a.substring(0, 2);
        let day2 = b.substring(0, 2);
        return sorter.indexOf(day1) - sorter.indexOf(day2);
      });
      return res.join(" | ");
    },
  },
});
</script>

<style src="@/styles/Lessons.css" scoped>
</style>