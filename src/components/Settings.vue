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
              <a class="button" v-bind:class="theme" @click="saveSettings">
                <span class="icon" v-bind:class="theme">
                  <i class="fas fa-save"></i>
                </span>
                <span>Save</span>
              </a>
            </div>
          </div>
          <div class="columns">
            <div class="column is-2">
            </div>
            <div class="column scrollbox" >
              <div class="message" v-for="(setting, key) in settings">
                <div class="message-header">
                  <span class="is-capitalized is-size-5">{{key | underscore-space}}</span>
                </div>
                <div class="message-body">
                <div class="field is-horizontal" v-for="(item, key) in setting">
                  <div class="field-label is-normal">
                    <label class="label">{{item.name}}</label>
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
          <div>
            <span class="is-size-7">Created by <a href="https://github.com/xmodulus">xmodulus</a></span>
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
  }),
  methods:{
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
  .scrollbox {
    width: 100%;
    height: 35rem;
    overflow: auto;
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
