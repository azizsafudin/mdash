<template>
  <div>
    <navigation @clicked="navClicked"></navigation>
    <section class="section">
      <grid-layout
        :layout="layout"
        :col-num="24"
        :row-height="50"
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
          <component :is="item.i"></component>
        </grid-item>
      </grid-layout>
    </section>
    <widget-list @close="showWidgetList = false" v-if="showWidgetList" @add="addWidget" @remove="removeWidget"></widget-list>
    <settings @close="showSettings = false" v-if="showSettings"></settings>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import _ from 'lodash';
import * as components from './widgets'
import Navigation from './partials/Navigation';
import Settings from './Settings';
import storage from '../helpers/storage.js';
import WidgetList from './WidgetList.vue';
import widgets from './WidgetsLoader';

const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;

export default {
  name: 'Home',
  components: Object.assign({
    WidgetList,
    Navigation,
    Settings,
    GridLayout,
    GridItem,
  }, components),
  data: () => ({
    showSettings: false,
    showWidgetList: false,
    widgetList: widgets.list,
    editMode: false,
    gridConf:{
      isDraggable: false,
      isResizable: false,
      isMirrored: false,
      verticalCompact: false,
    },
    layout: widgets.layout,
  }),
  methods: {
    toggleEditMode(save = false) {
      this.editMode = !this.editMode;
      this.gridConf.isDraggable = !!this.editMode;
//      this.gridConf.isResizable = !!this.editMode;
      if(save && !this.editMode)storage.setLayout(this.layout);
      else this.layout = storage.getLayout();
    },
    navClicked(item) {  // catch events emitted by navbar
      this.showSettings = (item === 'settings');
      this.showWidgetList = (item === 'widgetlist');
      if(item === 'editmode') this.toggleEditMode();
      if(item === 'saved') this.toggleEditMode(true);
    },
    addWidget(name){
      let widget = components[name];
      let layout = storage.getLayout();
      let item = _.find(layout, function(o){return o.i === name});
      if(!item){
        layout.push(widget.manifest.layout);
        this.layout = layout;
        storage.setLayout(layout);
      }
    },
    removeWidget(name){
      let layout = storage.getLayout();
      _.remove(layout, function(o){return o.i === name});
      this.layout = layout;
      storage.setLayout(layout);
    },
    load() {
      this.showSettings = false;
    },
  },
  mounted() {
    this.load();
  },
};
</script>
