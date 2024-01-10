import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import type Card from '../redux/cards/types/card';
import CardComponent from '../components/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LikesPage(): JSX.Element {
  const likes = useSelector((state: RootState) => state.cards.cards.filter((card) => card.isLiked));
  console.log(likes);

  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch('/api/cards')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newCards: Card[] = data.cards;
        // меняем стейт (чтобы перерисовалось на страничке)
        dispatch({ type: 'card/load', payload: newCards });
      })
      .catch((e) => console.log(e));

    return () => console.log('Очистка эффекта'); // сработает при размонтировании
  }, [dispatch]);

  return (
    <Container>
      {likes.length === 0 && <h1 style={{ marginTop: 24 }}>Нет лайков</h1>}
      <Row style={{ marginTop: 24 }}>
        {likes.map((card) => {
          return (
            <Col xs={12} sm={6} md={3} key={card.id}>
              <CardComponent card={card} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default LikesPage;
