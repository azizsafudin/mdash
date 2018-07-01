<template>
  <div class="main">
    <div class="clockface">{{timenow}}</div>
    <span class="title">{{datenow}}</span>
  </div>
</template>
<script>
import moment from 'moment';
import storage from '../../helpers/storage';

const widget_name = 'clock';
const manifest =  {
                    name: widget_name,        //  Widget name
                    settings: {
                      show24h: false,
                      showSeconds: false,
                    },
                    layout: {             //  default layout
                      i: widget_name,         //  Must be the same name
                      x: 7,
                      y: 2,
                      w: 10,
                      h: 5,
                    },
                  };

export default {
  name: manifest.name,
  data: () => ({
    timenow: '',
    datenow: '',
    settings: storage.getSettings(manifest.name),
  }),
  manifest: manifest,
  computed: {
    format() {
      let formatStr = this.settings.show24h ? 'H:mm' : 'h:mm';
      formatStr += this.settings.showSeconds ? ':ss' : '';
      formatStr += this.settings.show24h ? '' : 'A';
      return formatStr;
    },
  },
  mounted() {
    this.load();
    setInterval(this.getTime, 1000); //  update time every second.
  },
  methods: {
    getTime() {
      this.timenow = moment().format(this.format);
    },
    getDate() {
      this.datenow = moment().format('dddd, Do MMMM YYYY');
    },
    load() {
      this.getTime();
      this.getDate();
    },
  },
};
</script>

<style scoped>
  .main {
    text-align: center;
    /*border: solid black 2px;*/
    /*height:300px;*/
  }
  .clockface {
    font-size: 10vw;
  }
</style>
