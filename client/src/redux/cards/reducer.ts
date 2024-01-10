import type CardAction from './types/cardAction';
import type CardState from './types/cardState';

const initState: CardState = { cards: [] };

function reducer(state: CardState = initState, action: CardAction): CardState {
  switch (action.type) {
    case 'card/load':
      return { ...state, cards: action.payload };
    case 'card/like':
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload) {
            return { ...card, likesCount: card.likesCount + 1, isLiked: true };
          }
          return card;
        }),
      };
    case 'card/unlike':
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload) {
            return { ...card, likesCount: card.likesCount - 1, isLiked: false };
          }
          return card;
        }),
      };
    case 'card/add':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'card/delete':
      return { ...state, cards: state.cards.filter((card) => card.id !== action.payload.id) };
    case 'card/update':
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.id) {
            return action.payload;
          }
          return card;
        }),
      };
    default:
      return state;
  }
}
export default reducer;
