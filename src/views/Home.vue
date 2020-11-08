<template>
  <div class="playground">
    <div class="hint">Press "Space" to pause</div>

    <div
      v-if="isGameOver"
      class="game-over">
      <div>Game over!</div>
      <div>Your scores: {{ scores }}</div>
    </div>

    <Swings />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Swings from '@/components/swings';

export default {

  name: 'Home',

  components: {
    Swings,
  },

  computed: {
    ...mapGetters([
      'isGameOver',
      'scores',
    ]),
  },

};
</script>

<style lang="scss" scoped>
  .playground {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }

  .hint {
    padding: 20px;
    font-size: 20px;
  }
  .game-over {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    background-color: rgba(#fff, 0.9);
    z-index: 20;
  }
</style>
