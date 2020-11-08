<template>
  <div
    class="circle"
    :style="{
      width: `${weight * 8}px`,
      height: `${weight * 8}px`,
    }"
  />
</template>

<script>
export default {

  name: 'CircleFigure',

  props: {
    weight: {
      type: Number,
      required: true,
    },
  },

};
</script>

<style lang="scss" scoped>
.circle {
  border-radius: 50%;
  background-color: crimson;
}
</style>
