import type Card from '../../cards/types/card';

type GameAction =
  | { type: 'game/load'; payload: Card[] }
  | {
      type: 'game/answer';
      payload: string;
    };
export default GameAction;
