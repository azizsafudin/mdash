<template>
  <div>
    <navigation @clicked="navClicked"></navigation>
    <section class="section">
      <grid-layout
        :layout="layout"
        :col-num="12"
        :row-height="100"
        :auto-size="false"
        :is-draggable="gridConf.isDraggable"
        :is-resizable="gridConf.isResizable"
        :is-mirrored="gridConf.isMirrored"
        :vertical-compact="gridConf.verticalCompact"
        :use-css-transforms="true"
      >
        <grid-item v-for="item in layout"
                   :data="item"
                   :key="item.i"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
          <widgets :widgetName="item.i"></widgets>
        </grid-item>
      </grid-layout>
    </section>
    <settings @close="showSettings = false" v-if="showSettings"></settings>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import Navigation from './partials/Navigation';
import Settings from './Settings';
import Widgets from './WidgetsLoader.vue';
import storage from '../helpers/storage.js';

const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;

export default {
  name: 'Home',
  components: {
    Navigation,
    Settings,
    Widgets,
    GridLayout,
    GridItem,
  },
  data: () => ({
    showSettings: false,
    editMode: false,
    gridConf:{
      isDraggable: false,
      isResizable: false,
      isMirrored: false,
      verticalCompact: false,
    },
    layout: [],
  }),
  computed: { },
  created() { },
  methods: {
    toggleEditMode(save = false) {
      this.editMode = !this.editMode;
      this.gridConf.isDraggable = !!this.editMode;
//      this.gridConf.isResizable = !!this.editMode;
      if(save && !this.editMode)storage.set('mdash-layout', this.layout);
      else this.layout = storage.get('mdash-layout');
    },
    setLayout(){
      this.layout = Widgets.layout;
    },
    navClicked(item) {  // catch events emitted by navbar
      this.showSettings = (item === 'settings');
      if(item === 'editmode') this.toggleEditMode();
      if(item === 'saved') this.toggleEditMode(true);
    },
    load() {
      this.setLayout();
      this.showSettings = false;
    },
  },
  mounted() {
    this.load();
  },
};
</script>
