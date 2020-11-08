<template>
  <div class="side-stats">
    <div class="side-stats__row">Total weight: {{ weight }}</div>
    <div class="side-stats__row">Momentum: {{ momentum }}</div>
  </div>
</template>

<script>
export default {

  name: 'SideStats',

  props: {
    weight: {
      type: Number,
      required: true,
    },

    momentum: {
      type: Number,
      required: true,
    },
  },

};
</script>

<style lang="scss" scoped>
  .side-stats {
    padding: 20px;
    width: 50%;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }
</style>
