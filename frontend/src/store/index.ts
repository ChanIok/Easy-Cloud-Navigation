import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
  state() {
    return {
      event: '',
      count: 0,
    };
  },
  mutations: {
    increment(state: any) {
      state.count++;
    },
    setEvent(state, eventName: string) {
      state.event = eventName;
    },
  },
});

export default store;
