<template>
  <div>
    <home></home>
  </div>
</template>

<script>
import Home from './components/Home';
import storage from './helpers/storage';
import moment from 'moment';
import store from './store';

export default {
  name: 'App',
  components: {
    Home,
  },
  data: () => ({
    background: storage.get('mdash-background'),
  }),
  computed: {
    settings(){
      return store.getters.settings.mdash;
    }
  },
  mounted() {
    this.setBg();
  },
  watch:{
    settings: {
      handler() {
        this.setBg();
      },
      deep: true
    }
  },
  methods: {
    setBg(){
      if(!this.settings.showImage.value){
        document.body.style.backgroundColor = this.settings.bgColour.value;
        document.body.style.backgroundImage = '';
      }
      else if(this.settings.randomBg.value) {
        let date = moment().format('dddd, Do MMMM YYYY');
        let index = this.mod(this.hash(date), this.background.length);
        document.body.style.backgroundImage = 'url("' + this.background[index].filename + '")';
      }
      else{
        document.body.style.backgroundImage = 'url("/static/images/background-8.jpg")';
      }
    },
    hash(string){
      let hash = 0;
      if (string.length === 0) return hash;
      for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    },
    mod(n, m) {
      return ((n % m) + m) % m;
    }
  },
};
</script>

<style lang="scss">
  @import 'assets/css/global.scss';
  body {
    background: no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;
  }
  img.bg {
    /* Set rules to fill background */
    min-height: 100%;
    min-width: 1024px;

    /* Set up proportionate scaling */
    width: 100%;
    height: auto;

    /* Set up positioning */
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
