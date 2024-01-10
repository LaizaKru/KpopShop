import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/store';
import { Routes, Route } from 'react-router';
import RegPage from './pages/RegPage';
import LogPage from './pages/LogPage';
import Layout from './components/Layout';
import CardsPage from './pages/CardsPage';
import type User from './redux/auth/types/user';
import UpdatePage from './pages/UpdatePage';
import LikesPage from './pages/LikesPage';
import GamePage from './pages/GamePage';
import MusicPage from './pages/MusicPage';
import './style.css';
function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/api/auth/check')
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'success') {
          const userData: User = data.user;
          dispatch({ type: 'auth/login', payload: userData });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/reg" element={<RegPage />} />
        <Route path="/login" element={<LogPage />} />
        <Route path="/" element={<CardsPage />} />
        <Route path="/cards/:id" element={<UpdatePage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/music" element={<MusicPage />} />
      </Route>
    </Routes>
  );
}

export default App;
