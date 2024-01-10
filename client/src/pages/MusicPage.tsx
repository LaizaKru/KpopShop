import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import Button from 'react-bootstrap/Button';
import Track from '../redux/music/types/track';

function MusicPage(): JSX.Element {
  const track = useSelector((state: RootState) => state.music.tracks[state.music.trackIndex]);
  const score = useSelector((state: RootState) => state.music.score);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/api/tracks')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newTracks: Track[] = data;
        // меняем стейт (чтобы перерисовалось на страничке)
        dispatch({ type: 'music/load', payload: newTracks });
      })
      .catch((e) => console.log(e));

    return () => console.log('Очистка эффекта'); // сработает при размонтировании
  }, [dispatch]);
  const [answer, setAnswer] = useState('');
  const handleAnswer = () => {
    dispatch({ type: 'music/answer', payload: answer });
    setAnswer('');
  };
  if (!track) {
    return <div>Ваш счет {score}</div>;
  }
  return (
    <div className="game-container">
      <h1>Угадай группу</h1>
      <p className="game-score">Счет: {score}</p>
      <audio key={track?.id} controls>
        <source src={track?.url}></source>
      </audio>
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
export default MusicPage;
