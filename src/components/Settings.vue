<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container notification" v-bind:class="theme" @click.stop>
          <button class="delete" @click="$emit('close')"></button>
          <h3 class="title" v-bind:class="theme">&mdash;{{msg.title}}</h3>
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
    dark: storage.getSettings('mdash'),
  }),
  computed:{
    theme(){
      return{
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
        'is-dark': this.dark,
        'is-light': this.dark,
      }
    }
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
