import React, { useState } from 'react';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddCardForm(): JSX.Element {
  const [artist, setArtist] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState(0);
  const [forGame, setForGame] = useState(false);
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/cards', {
      method: 'POST',
      body: JSON.stringify({ price, artist, img, forGame }),
      headers: { 'Content-type': 'application/json' },
    });
    const data = await response.json();
    if (data.success) {
      dispatch({ type: 'card/add', payload: data.card });
      setArtist('');
      setImg('');
      setPrice(0);
      setForGame(false);
    }
  };
  return (
    <div>
      {user?.isAdmin && (
        <Form onSubmit={handleSubmit} className="glass-form">
          <h3 style={{ marginBottom: 12 }}>Добавить карточку</h3>
          <Form.Group style={{ marginBottom: 12 }}>
            <Form.Label>Название ариста:</Form.Label>
            <Form.Control
              type="text"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: 12 }}>
            <Form.Label>Фото:</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: 12 }}>
            <Form.Label>Цена:</Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: 12 }}>
            <Form.Check
              label="Для игры"
              type="checkbox"
              checked={forGame}
              onChange={(e) => setForGame(e.currentTarget.checked)}
            />
          </Form.Group>
          <Button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Добавить
          </Button>
        </Form>
      )}
    </div>
  );
}
