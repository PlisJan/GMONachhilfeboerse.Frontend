<template>
  <div class="content">
    Herzlich Willkommen<br />
    bei der<br />
    GMO Nachhilfebörse

    <div class="news">{{ news }}</div>
  </div>
</template>

<style scoped>
.content {
  font-size: 5vw;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}
.news {
  margin-top: 15vh;
  font-size: 2vw;
  text-align: center;
}
</style>