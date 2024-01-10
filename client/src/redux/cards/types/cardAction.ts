import Card from './card';

type CardAction =
  | {
      type: 'card/load';
      payload: Card[];
    }
  | {
      type: 'card/add';
      payload: Card;
    }
  | {
      type: 'card/delete';
      payload: Card;
    }
  | {
      type: 'card/update';
      payload: Card;
    }
  | {
      type: 'card/like';
      payload: Card['id'];
    }
  | {
      type: 'card/unlike';
      payload: Card['id'];
    } 
export default CardAction;
