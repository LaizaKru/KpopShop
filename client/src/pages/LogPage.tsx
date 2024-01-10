import React, { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';

function LogPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-type': 'application/json' },
        });
        const data = await res.json();
        if (data.success) {
          dispatch({ type: 'auth/login', payload: data.user });
          navigate('/');
        } else {
          alert(data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    },
    [email, password, dispatch, navigate],
  );
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="password"
        />
        <button type="submit"> Войти </button>
      </form>
    </div>
  );
}

export default LogPage;
