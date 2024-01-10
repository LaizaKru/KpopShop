import type GameAction from './types/gameAction';
import type GameState from './types/gameState';

const initState: GameState = { cards: [], cardIndex: 0, score: 0 };

function reducer(state: GameState = initState, action: GameAction): GameState {
  switch (action.type) {
    case 'game/load':
      return { ...state, cards: action.payload };
    case 'game/answer': {
      const card = state.cards[state.cardIndex];
      let cardIndex = state.cardIndex;
      let score = state.score;
      if (action.payload === card.artist) {
        score++;
      } else {
        score--;
      }
      if (state.cards.length > cardIndex) {
        cardIndex++;
      }
      return { ...state, score, cardIndex };
    }
    default:
      return state;
  }
}
export default reducer;
