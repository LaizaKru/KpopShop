import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import type Card from '../redux/cards/types/card';
import CardComponent from '../components/Card';
import AddCardForm from '../components/AddCardForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CardsPage(): JSX.Element {
  const cards = useSelector((state: RootState) =>
    state.cards.cards.filter((card) => {
      return !card.forGame;
    }),
  );
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
  useEffect(() => {
    document.body.classList.add('cards-page');
    return () => {
      document.body.classList.remove('cards-page');
    };
  }, []);
  return (
    <Container>
      <Row>
        <Col xs={12} style={{ marginTop: 24 }}>
          <AddCardForm />
        </Col>
      </Row>
      <Row>
        {cards.map((card) => {
          return (
            <Col xs={12} sm={6} md={3} key={card.id} style={{ marginBlock: 24 }}>
              <CardComponent card={card} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default CardsPage;
