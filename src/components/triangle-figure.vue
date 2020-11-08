<template>
  <div
    class="triangle"
    :style="{
      width: `${size}px`,
      height: `${size / 2}px`,
    }"
  >
    <div
      class="triangle__inner"
      :style="{
        borderWidth: `0 ${size / 2}px ${size / 2}px ${size / 2}px`,
       }"
    />
  </div>
</template>

<script>
export default {

  name: 'TriangleFigure',

  props: {
    weight: {
      type: Number,
      required: true,
    },
  },

  computed: {
    size() {
      return this.weight * 8;
    },
  },

};
</script>

<style lang="scss" scoped>
 .triangle {
   position: relative;

   &__inner {
     border-style: solid;
     border-color: transparent transparent #007bff transparent;
   }
 }
</style>
