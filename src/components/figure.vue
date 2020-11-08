<template>
  <div
    :class="['figure', { 'is-animated': isFalling }]"
    :style="{
      [side]: `${figure.distance * 20}%`,
      animationPlayState: pause ? 'paused' : 'running',
    }"
  >
    <component
      :is="`${figure.type}-type`"
      :weight="figure.weight"
    />

    <span
      :style="{
        fontSize: `${figure.weight * 2}px`
      }"
      class="figure__text"
    >
      {{ figure.weight }}
    </span>
  </div>
</template>

<script>
import CircleFigure from './circle-figure';
import TriangleFigure from './triangle-figure';
import SquareFigure from './square-figure';

export default {

  name: 'Figure',

  components: {
    'circle-type': CircleFigure,
    'triangle-type': TriangleFigure,
    'square-type': SquareFigure,
  },

  props: {
    figure: {
      type: Object,
      required: true,
    },

    isFalling: {
      type: Boolean,
      default: false,
    },

    side: {
      type: String,
      default: 'left',
    },

    pause: {
      type: Boolean,
      default: false,
    },
  },

};
</script>

<style lang="scss" scoped>
  .figure {
    position: absolute;
    transform: translateY(-100%);
    display: inline-block;
    top: 100%;

    &.is-animated {
      top: 0;
      animation: falling 10s forwards;
    }

    &__text {
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
  }

  @keyframes falling {
    from {
      top: 0;
    }

    to {
      top: 100%;
    }
  };
</style>
