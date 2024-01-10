import React, { useState } from 'react';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import type Card from '../redux/cards/types/card';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type UpdateCardFormPropTypes = {
  card: Card;
};

export default function UpdateCardForm({ card }: UpdateCardFormPropTypes): JSX.Element {
  const [artist, setArtist] = useState(card.artist);
  const [img, setImg] = useState(card.img);
  const [price, setPrice] = useState(card.price);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = card;
  const user = useSelector((state: RootState) => state.auth.user);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ price, artist, img }),
      headers: { 'Content-type': 'application/json' },
    });
    const data = await response.json();
    if (data.success) {
      dispatch({ type: 'card/update', payload: data.card });
      navigate('/cards');
    }
  };
  return (
    <div className="container">
      {user?.isAdmin && (
        <Form onSubmit={handleSubmit}>
          <h4>Изменить карточку</h4>
          <Form.Group>
            <Form.Label>название ариста:</Form.Label>
            <Form.Control
              type="text"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Фото:</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Цена:</Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Изменить
          </Button>
        </Form>
      )}
    </div>
  );
}
