<template>
  <div class="content">
    <h1>Zuordnen</h1>

    <input
      class="btn middleBtn"
      type="button"
      value="Angebote zuordnen"
      @click="triggerMatch"
    />
  </div>
  <h1 v-if="totalAmount != ''">
    {{ matchedAmount }}/{{ totalAmount }} zugeordnet!
  </h1>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { API_URL, getData } from "@/helper/WebApiHelper";
import { store } from "@/helper/store";

export default defineComponent({
  name: "ImportUsersComponent",

  data() {
    return { totalAmount: "", matchedAmount: "" };
  },

  methods: {
    triggerMatch() {
      getData(
        API_URL +
          "match?token=" +
          store.state.token +
          "&username=" +
          store.state.user
      ).then((res) => {
        this.totalAmount = res.totalAmount;
        this.matchedAmount = res.matchedAmount;
      });
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