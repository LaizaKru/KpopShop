import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function MainPage(): JSX.Element {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      {user ? user.name : ' Вы не авторизованы'}
      <button type="button"> Посомтреть карточки </button>
    </div>
  );
}

export default MainPage;
