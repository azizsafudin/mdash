<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container notification" v-bind:class="theme" @click.stop>
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="is-size-5" v-bind:class="theme">&mdash;{{msg.title}}</p>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <p class="control has-icons-right">
                  <input class="input is-small is-rounded" type="text" v-model="search">
                  <span class="icon is-small is-right">
                    <i class="fas fa-search"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <!--<button class="delete" @click="$emit('close')"></button>-->
          <div class="scrollbox">
            <table class="table is-dark is-narrow is-fullwidth">
              <tbody>
                <tr v-for="widget in filteredList">
                  <td class="is-capitalized">{{widget.name | underscore-space}}</td>
                  <td class="is-size-7">{{widget.description}}</td>
                  <td>
                    <button
                      class="button is-primary is-pulled-right"
                      @click="handleClick('add', widget.name)"
                      v-if="!isAdded(widget.name)"
                    >
                      <span class="icon">
                        <i class="fas fa-plus"></i>
                      </span>
                    </button>
                    <button
                      class="button is-danger is-pulled-right"
                      @click="handleClick('remove', widget.name)"
                      v-else
                    >
                      <span class="icon">
                        <i class="fas fa-times"></i>
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import storage from '../helpers/storage';
import widgets from './WidgetsLoader';
import _ from 'lodash';

export default {
  name: 'WidgetList',
  data: () => ({
    msg: {
      title: 'Widgets',
    },
    search: '',
    layout: storage.getLayout(),
    dark: storage.getSettings('mdash').dark.value,
    list: widgets.list,
  }),
  computed:{
    theme(){
      return{
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
        'is-dark': this.dark,
        'is-light': !this.dark,
      }
    },
    filteredList() {
      return this.list.filter(widget => {
        return (widget.name.toLowerCase()+widget.description.toLowerCase()).includes(this.search.toLowerCase())
      });
    },
  },
  methods:{
    handleClick(action, payload){
      this.$emit(action, payload);
      this.layout = storage.getLayout();
    },
    isAdded(name){
      let item = _.find(this.layout, function(o){return o.i === name});
      return !!item;
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
    width: 25%;
    min-height:80%;
    max-height:90%;
    margin: 0px auto;
    padding: 20px 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    position: fixed;
    bottom:0;
    right:0;
  }
  .notification{
    border-top-left-radius: 10px;
  }
  .table{
    border-radius: 5px;
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
