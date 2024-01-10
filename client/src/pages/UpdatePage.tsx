import React, { useEffect, useState } from 'react';

import type Card from '../redux/cards/types/card';

import UpdateCardForm from '../components/UpdateCardForm';
import { useParams } from 'react-router';

function UpdatePage(): JSX.Element {
  const { id } = useParams(); // coons params=usePearams()
  const [card, setCard] = useState<Card | null>(null);
  useEffect(() => {
    fetch(`/api/cards/${id}`, {
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data: { card: Card }) => setCard(data.card));
  }, []);
  if (!card) {
    return <div>Загрузка</div>;
  }
  return <UpdateCardForm card={card} />;
}
export default UpdatePage;
