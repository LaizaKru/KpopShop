import type MusicAction from './types/gameAction';
import type MusicState from './types/gameState';

const initState: MusicState = { tracks: [], trackIndex: 0, score: 0 };

function reducer(state: MusicState = initState, action: MusicAction): MusicState {
  switch (action.type) {
    case 'music/load':
      return { ...state, tracks: action.payload };
    case 'music/answer': {
      const track = state.tracks[state.trackIndex];
      let trackIndex = state.trackIndex;
      let score = state.score;
      if (action.payload.trim().toLowerCase() === track.group.trim().toLowerCase()) {
        score++;
      } else {
        score--;
      }
      if (state.tracks.length > trackIndex) {
        trackIndex++;
      }
      return { ...state, score, trackIndex };
    }
    default:
      return state;
  }
}
export default reducer;
