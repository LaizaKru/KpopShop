import React, { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { useNavigate } from 'react-router';

function RegPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
        headers: { 'Content-type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        dispatch({ type: 'auth/reg', payload: data.user });
        navigate('/');
      } else {
        alert(data.error);
      }
    } catch (error) {}
  };
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="name"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="password"
        />
        <button type="submit"> Зарегистрироваться </button>
      </form>
    </div>
  );
}

export default RegPage;
