import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getTotalWeight = (arr) => arr.reduce((total, { weight }) => total + weight, 0);
const getTotalMomentum = (arr) => arr.reduce((
  total,
  { distance, weight },
) => total + weight * distance, 0);

export default new Vuex.Store({
  state: {
    leftSide: [],
    rightSide: [],
    tiltAngle: 0,
    pause: false,
  },
  getters: {
    leftSideWeight: ({ leftSide }) => getTotalWeight(leftSide),
    rightSideWeight: ({ rightSide }) => getTotalWeight(rightSide),
    leftSideMomentum: ({ leftSide }) => getTotalMomentum(leftSide),
    rightSideMomentum: ({ rightSide }) => getTotalMomentum(rightSide),
    totalWeight: (state, { leftSideWeight, rightSideWeight }) => leftSideWeight + rightSideWeight,
    tiltAngle: (
      state,
      { leftSideWeight, leftSideMomentum, rightSideMomentum },
    ) => (leftSideWeight && (rightSideMomentum - leftSideMomentum)) || 0,
    isGameOver: (state, { tiltAngle }) => tiltAngle < -30 || tiltAngle > 30,
    scores: ({ leftSide }) => leftSide.length,
  },

  mutations: {
    ADD_TO_LEFT(state, figure) {
      state.leftSide.push(figure);
    },

    ADD_TO_RIGHT(state, figure) {
      state.rightSide.push(figure);
    },

    SET_PAUSE(state) {
      state.pause = !state.pause;
    },
  },
});
