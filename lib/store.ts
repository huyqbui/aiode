import { createStore, action } from 'easy-peasy';

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  volume: 0.5,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
  changeVolume: action((state: any, payload) => {
    state.volume = payload;
  }),
});
