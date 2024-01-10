import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type Card from '../redux/cards/types/card';
import Button from 'react-bootstrap/Button';
import BootCard from 'react-bootstrap/Card';

import { RootState, useAppDispatch } from '../redux/store';

type CardPropsType = {
  card: Card;
};

function CardComponent({ card }: CardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const handleLike = async () => {
    const response = await fetch(`/api/cards/${card.id}/like`, {
      method: 'POST',
    });
    if (response.ok) {
      const data = await response.json();
      if (data.isLiked) {
        dispatch({ type: 'card/like', payload: card.id });
      } else {
        dispatch({ type: 'card/unlike', payload: card.id });
      }
    }
  };
  const handleRemove = async (id: Card['id']): Promise<void> => {
    // кинула запрос на сервер (тот удалит из бд)
    const response = await fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      dispatch({ type: 'card/delete', payload: card });
    }
    // дожидаюсь ответа  - от сервера пришла айди удеаленной вакансии
    //  меняю стейт
  };
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    notation: 'compact',
    currency: 'RUB',
  }).format(card.price);
  const [flipped, setFlipped] = useState(false);
  return (
    <BootCard className={flipped ? 'flipped' : ''} onClick={() => setFlipped((prev) => !prev)}>
      <BootCard.Img
        variant="top"
        src={card.img}
        height={280}
        style={{ objectFit: 'cover', objectPosition: 'top' }}
      />
      <BootCard.Body>
        <BootCard.Title>
          <Link to={`/cards/${card.id}`} style={{ color: '#333', textDecoration: 'none' }}>
            <h4>{card.artist}</h4>
          </Link>
        </BootCard.Title>
        <BootCard.Text>{formattedPrice}</BootCard.Text>
        {user && (
          <Button onClick={handleLike} variant="danger" style={{ marginRight: 4 }}>
            {card.isLiked ? '❤️' : '🤍'} {card.likesCount}
          </Button>
        )}
        <Button target="_blank" href="https://t.me/LikaShopkpop" style={{ marginRight: 4 }}>
          Купить
        </Button>
        {user?.isAdmin && (
          <Button type="button" onClick={() => handleRemove(card.id)}>
            Удалить
          </Button>
        )}
      </BootCard.Body>
      {/*<div className="card-bg" style={{ backgroundImage: `url(${card.img})` }} />*/}
    </BootCard>
  );
}

export default CardComponent;
