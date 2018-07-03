<template>
  <div class="main is-unselectable">
    <span class="title" v-bind:class="theme">{{date}}</span>
  </div>
</template>

<script>
import moment from 'moment';
import storage from '../../helpers/storage';

const widget_name = 'date';
const manifest =  {
                    name: widget_name,        //  Widget name
                    description: 'Simple date widget',
                    settings: {
                      format: {
                        name: 'Date format',
                        value: 'dddd, Do MMMM YYYY',
                        type: 'string'
                      },
                    },
                    layout: {             //  default layout
                      i: widget_name,         //  Must be the same name
                      x: 9,
                      y: 7,
                      w: 6,
                      h: 1,
                    },
                  };

export default {
  name: manifest.name,
  data: () => ({
    date: '',
    dark: storage.getSettings('mdash').dark.value,
    settings: storage.getSettings(manifest.name),
  }),
  manifest: manifest,
  computed: {
    theme(){
      return {
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
      };
    }
  },
  mounted() {
    this.getDate();
//    setTimeout(
//      this.getDate(),
//      moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds')
//    );
  },
  methods: {
    getDate() {
      this.date = moment().format(this.settings.format.value);
    },
  },
};
</script>

<style scoped>
  .main {
    text-align: center;
    /*border: solid black 2px;*/
    /*height:300px;*/
    font-family: 'Lato', sans-serif;
  }
</style>
