<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container notification" v-bind:class="theme" @click.stop>
          <button class="delete" @click="$emit('close')"></button>
          <div class="level">
            <div class="level-left">
              <h3 class="level-item is-size-5" v-bind:class="theme">&mdash;{{msg.title}}</h3>
            </div>
            <div class="level-right">
              <a class="level-item button" v-bind:class="theme" @click="saveSettings">
                <span class="icon" v-bind:class="theme">
                  <i class="fas fa-save"></i>
                </span>
                <span>Save</span>
              </a>
            </div>
          </div>
          <div class="columns">
            <div class="column is-2">
              <span class="is-size-7" id="credit">mdash by <a href="https://github.com/xmodulus">modulus</a></span>
            </div>
            <div class="column">
              <div class="tabs is-boxed">
                <ul>
                  <li :class="{'is-active':activeTab=='general'}" @click="showTab('general')"><a>General</a></li>
                  <li :class="{'is-active':activeTab=='photos'}" @click="showTab('photos')"><a>Photos</a></li>
                </ul>
              </div>
              <div class="scrollbox" v-if="activeTab == 'general'">
                <div class="scrollbox-child">
                  <div class="message" v-for="(setting, key) in settings">
                    <div class="message-header">
                      <span class="is-capitalized is-size-5">{{key | underscore-space}}</span>
                    </div>
                    <div class="message-body">
                    <div class="field is-horizontal" v-for="(item, key) in setting">
                      <div class="field-label is-normal">
                        <label v-if="item.tooltip" class="label tooltip is-tooltip-right" :data-tooltip="item.tooltip">{{item.name}}</label>
                        <label class="label" v-else>{{item.name}}</label>
                      </div>
                      <!--for booleans-->
                      <div class="field-body" v-if="setting[key].type === 'boolean'">
                        <div class="field">
                          <div class="control">
                            <input
                              v-model="setting[key].value"
                              :id="key"
                              type="checkbox"
                              :name="key"
                              class="checkbox switch is-rounded is-rtl"
                            >
                            <label class="label" :for="key"></label>
                          </div>
                        </div>
                      </div>

                      <!--for strings-->
                      <div class="field-body" v-if="setting[key].type === 'string'">
                        <div class="field">
                          <div class="control">
                            <input
                              v-model="setting[key].value"
                              type="text"
                              class="input is-rounded"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                      <!--Implement other types of settings here-->
                    </div>
                  </div>
                </div>
              </div>
              <!--Photos tab-->
              <div class="scrollbox" v-if="activeTab == 'photos'">
                <h3>PHOTOS</h3>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  </transition>
</template>

<script>
import storage from '../helpers/storage';
import * as components from './WidgetsLoader'

export default {
  name: 'Settings',
  data: () => ({
    msg: {
      title: 'settings',
    },
    settings: storage.get('mdash-settings'),
    dark: storage.getSettings('mdash').dark.value,
    activeTab: 'general',
  }),
  methods:{
    showTab(tabName){
      this.activeTab = tabName;
    },
    saveSettings(){
      storage.set('mdash-settings', this.settings);
      location.reload();
    }
  },
  computed:{
    theme(){
      return{
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
        'is-dark': this.dark,
        'is-light': !this.dark,
      }
    },
  }
};
</script>


<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 70%;
    min-height:50%;
    max-height:90%;
    margin: 0px auto;
    padding: 20px 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .notification {
    border-radius: 10px;
  }
  .notification a {
    text-decoration: none;
  }
  .scrollbox {
    width: 100%;
    height: 25rem;
    /*padding-right: 2em;*/
    position: relative;
    overflow: hidden;
  }
  .scrollbox-child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
    overflow-y: scroll;
  }
  #credit {
    position: absolute;
    bottom: 2em;
    left: 2em;
  }
  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
