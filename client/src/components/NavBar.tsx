import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import BootStrapNavbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../redux/store';
import type { RootState } from '../redux/store';

function NavBar(): JSX.Element {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const handleLogout = () =>
    fetch('/api/auth/logout').then((res) => {
      if (res.ok) {
        dispatch({ type: 'auth/logout' });
      }
    });

  return (
    <BootStrapNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <BootStrapNavbar.Brand as={Link} to="/">
          KPOP shop
        </BootStrapNavbar.Brand>
        {user ? (
          <div>
            <Link to="/" style={{ marginRight: 12, textDecoration: 'none' }}>
              Главная
            </Link>
            <Link to="/likes" style={{ marginRight: 12, textDecoration: 'none' }}>
              Любимые карточки
            </Link>
            <Link to="/game" style={{ marginRight: 12, textDecoration: 'none' }}>
              Угадай артиста
            </Link>
            <Link to="/music" style={{ marginRight: 12, textDecoration: 'none' }}>
              Угадай мелодию
            </Link>
            <Button type="button" onClick={handleLogout} size="sm">
              Выйти
            </Button>
          </div>
        ) : (
          <div>
            <Link to="/login"> Войти</Link> <Link to="/reg">Зарегистрироваться</Link>
          </div>
        )}
      </Container>
    </BootStrapNavbar>
  );
}
export default NavBar;
