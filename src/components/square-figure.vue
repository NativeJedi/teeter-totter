<template>
  <div
    class="square"
    :style="{
      width: `${weight * 8}px`,
      height: `${weight * 8}px`,
    }"
  />
</template>

<script>
export default {

  name: 'SquareFigure',

  props: {
    weight: {
      type: Number,
      required: true,
    },
  },

};
</script>

<style lang="scss" scoped>
.square {
  background-color: darkviolet;
}
</style>
