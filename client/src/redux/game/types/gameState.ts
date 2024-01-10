import type Card from '../../cards/types/card';

type GameState = { cards: Card[]; cardIndex: number; score: number };

export default GameState;
