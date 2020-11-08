<template>
  <div class="swings">
    <div class="swings__stats">
      <SideStats
        :weight="leftSideWeight"
        :momentum="leftSideMomentum"
      />

      <SideStats
        :weight="rightSideWeight"
        :momentum="rightSideMomentum"
      />
    </div>

    <div
      class="swings__area"
      :style="{
        transform: `rotate(${rotateAngle}deg)`,
      }"
    >
      <div class="swings__side swings__side--left">
        <Figure
          v-if="fallingFigure"
          :figure="fallingFigure"
          :is-falling="true"
          :pause="pause"
          side="right"
        />

        <Figure
          v-for="figure of this.$store.state.leftSide"
          :key="figure.id"
          :figure="figure"
          side="right"
        />
      </div>

      <div class="swings__side swings__side--right">
        <Figure
          v-for="figure of this.$store.state.rightSide"
          :key="figure.id"
          :figure="figure"
        />
      </div>

      <div class="swings__board"/>
    </div>

    <div class="swings__thumb" />
  </div>
</template>

<script>
import SideStats from '@/components/side-stats';
import Timer from '@/utils/timer';
import uniqid from 'uniqid';
import { mapGetters, mapState } from 'vuex';
import Figure from '@/components/figure';

const TYPES = ['circle', 'triangle', 'square'];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateFigure = () => {
  const weight = getRandomNumber(1, 10);
  const typeIndex = getRandomNumber(0, TYPES.length - 1);
  const distance = getRandomNumber(1, 5);

  return {
    id: uniqid(),
    type: TYPES[typeIndex],
    weight,
    distance,
  };
};

export default {

  name: 'Swings',

  components: {
    SideStats,
    Figure,
  },

  data() {
    return {
      fallingFigure: null,
      timer: null,
    };
  },

  computed: {
    ...mapState([
      'pause',
    ]),

    ...mapGetters([
      'leftSideMomentum',
      'rightSideMomentum',
      'leftSideWeight',
      'rightSideWeight',
      'tiltAngle',
      'isGameOver',
    ]),

    rotateAngle() {
      if (this.tiltAngle === 0) return 0;

      if (this.tiltAngle > 30) return 30;

      if (this.tiltAngle < -30) return -30;

      return this.tiltAngle;
    },
  },

  watch: {
    isGameOver() {
      if (this.isGameOver) {
        this.fallingFigure = null;
        this.timer.pause();
        this.timer = null;
      }
    },

    pause() {
      if (!this.timer) {
        return;
      }

      if (this.pause) {
        this.timer.pause();
      } else {
        this.timer.resume();
      }
    },
  },

  created() {
    this.setTimer();

    window.addEventListener('keyup', this.handleKeyup);
  },

  beforeDestroy() {
    this.timer.pause();
    window.removeEventListener('keyup', this.handleKeyup);
  },

  methods: {
    setTimer() {
      this.$nextTick(() => {
        this.runNextRound();

        this.timer = new Timer(() => {
          this.$store.commit('ADD_TO_LEFT', this.fallingFigure);
          this.fallingFigure = null;

          this.setTimer();
        }, 10000);
      });
    },

    runNextRound() {
      this.fallingFigure = generateFigure();
      this.$store.commit('ADD_TO_RIGHT', generateFigure());
    },

    handleKeyup({ code }) {
      const { distance } = this.fallingFigure;

      const isControlsBlocked = !this.fallingFigure || this.pause;

      const handlers = {
        ArrowLeft: () => {
          if (isControlsBlocked) {
            return;
          }

          this.fallingFigure.distance = distance < 5 ? distance + 1 : 1;
        },
        ArrowRight: () => {
          if (isControlsBlocked) {
            return;
          }

          this.fallingFigure.distance = distance > 1 ? distance - 1 : 5;
        },
        Space: () => this.$store.commit('SET_PAUSE'),
      };

      const handler = handlers[code];

      if (handler) {
        handler();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .swings {
    position: relative;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    width: 1000px;
    height: 100%;
    &__stats {
      display: flex;
    }

    &__area {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-wrap: wrap;
      transform-origin: 50% 100%;
      transition: transform .3s;
    }

    &__side {
      display: flex;
      flex-direction: column;
      position: relative;
      width: calc(50% - 100px);
      justify-content: flex-end;
      height: 100%;
    }

    &__board {
      width: 100%;
      height: 20px;
      border-radius: 5px;
      background-color: #000;
    }

    &__thumb {
      position: relative;
      width: 20px;
      height: 260px;
      background-color: #000;
      margin: 0 auto;
      border-radius: 10px 10px 0 0;
      &::after {
        content: '';
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translate(-50%, -100%);
        background-color: #fff;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
    }
  }
</style>
