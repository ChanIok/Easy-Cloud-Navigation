<template>
  <div id="time">
    <div class="header">{{ year }}/{{ month }}/{{ date }}</div>
    <div class="footer">{{ hours }}:{{ minutes }}:{{ seconds }}</div>
  </div>
</template>

<script>
export default {
  name: "Time",
  data() {
    return {
      year: "--",
      month: "--",
      date: "--",
      hours: "--",
      minutes: "--",
      seconds: "--",
    };
  },
  components: {},
  methods: {
    setClock() {
      setInterval(() => {
        this.initClock();
      }, 1000);
    },
    initClock() {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth().toString().padStart(2, "0");
      this.date = new Date().getDate().toString().padStart(2, "0");
      this.hours = new Date().getHours().toString().padStart(2, "0");
      this.minutes = new Date().getMinutes().toString().padStart(2, "0");
      this.seconds = new Date().getSeconds().toString().padStart(2, "0");
    },
  },
  mounted() {
    this.initClock();
    this.setClock();
  },
};
</script>

<style  lang="scss" scoped>
#time {
  .header {
    font-size: 52px;
    padding-bottom: 20px;
    padding-left: 20px;
    @media (max-width: 360px) {
      font-size: 46px;
    }
      @media (max-width: 320px) {
      font-size: 36px;
    }
  }
  .footer {
    font-size: 72px;
    font-weight: 700;
    text-align: center;
    @media (max-width: 360px) {
      font-size: 58px;
    }
      @media (max-width: 320px) {
      font-size: 48px;
    }
  }
}
</style>