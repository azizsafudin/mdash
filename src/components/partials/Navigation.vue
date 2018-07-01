<template>
  <nav class="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a href="https://msociety.tech" class="navbar-item" @mouseover = "showLogo = false" @mouseleave = "showLogo = true">
          <b>&mdash;</b>
          <transition name="slide-fade">
            <span v-if="!showLogo">mdash</span>
          </transition>
        </a>
        <!--hamburger menu-->
        <div class="navbar-burger" v-show="false">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a v-if="showEdit" class="navbar-item tooltip is-tooltip-bottom" data-tooltip="Edit dashboard" @click="handleEdit">
            <span class="icon">
              <i class="fas fa-arrows-alt"></i>
            </span>
          </a>
          <a class="navbar-item" @click="handleSave" v-else>
            <span class="icon">
              <i class="fas fa-save"></i>
            </span>
          </a>
          <a v-if="!showEdit" class="navbar-item" @click="handleEdit">
            <span class="icon has-text-danger">
              <i class="fas fa-times"></i>
            </span>
          </a>
          <a class="navbar-item tooltip is-tooltip-bottom" data-tooltip="—mdash settings" @click="$emit('clicked', 'settings')">
            <span class="icon">
              <i class="fas fa-cog"></i>
            </span>
          </a>
          <a class="navbar-item tooltip is-tooltip-bottom" data-tooltip="Add new widget" @click="$emit('clicked', 'widgetlist')">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navigation',
  data: () => ({
    showLogo: true,
    showEdit: true,
  }),
  computed: { },
  created() { },
  mounted() { },
  methods: {
    handleEdit(){
      this.$emit('clicked', 'editmode');
      this.showEdit = !this.showEdit;
    },
    handleSave(){
      this.$emit('clicked', 'saved');
      this.showEdit = !this.showEdit;
    },
  },
};
</script>

<style>
  .icon {
    font-size: 0.75em;
  }
  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .7s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
