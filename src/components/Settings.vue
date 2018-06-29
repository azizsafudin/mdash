<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container notification" @click.stop>
          <button class="delete" @click="$emit('close')"></button>
          <p class="title">&mdash;{{msg.title}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import storage from '../helpers/storage';
import * as components from './widgets'

export default {
  name: 'Settings',
  data: () => ({
    msg: {
      title: 'settings',
    },
    settings: storage.get('mdash-settings'),
  }),
};
</script>


<style>
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
    background-color: #fff;
    /*border-radius: 10px;*/
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
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
