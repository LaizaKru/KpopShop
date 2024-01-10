import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import type Card from '../redux/cards/types/card';
import Button from 'react-bootstrap/Button';

function GamePage(): JSX.Element {
  const card = useSelector((state: RootState) => state.game.cards[state.game.cardIndex]);
  const score = useSelector((state: RootState) => state.game.score);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/api/cards')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newCards: Card[] = data.cards;
        // меняем стейт (чтобы перерисовалось на страничке)
        dispatch({ type: 'game/load', payload: newCards });
      })
      .catch((e) => console.log(e));

    return () => console.log('Очистка эффекта'); // сработает при размонтировании
  }, [dispatch]);
  const [answer, setAnswer] = useState('');
  const handleAnswer = () => {
    dispatch({ type: 'game/answer', payload: answer });
    setAnswer('');
  };
  if (!card) {
    return <div>Ваш счет {score}</div>;
  }
  return (
    <div className="game-container">
      <h1>Угадай что за кпопер</h1>
      <p className="game-score">Счет: {score}</p>
      <img width="500px" src={card.img} alt="угадай кто на фотке" />
      <input
        type="text"
        name="answer"
        placeholder="Напиши ответ"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button type="button" onClick={handleAnswer}>
        Ответить
      </Button>
    </div>
  );
}
export default GamePage;
