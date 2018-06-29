<template>
  <div>
    <home></home>
  </div>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    Home,
  },
  data: () => ({}),
  computed: { },
  created() { },
  mounted() { },
  methods: { },
};
</script>

<style lang="scss">
  @import 'assets/css/global.scss';
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
