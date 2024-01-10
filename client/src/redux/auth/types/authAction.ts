import User from './user';

type AuthAction =
  | {
      type: 'auth/reg';
      payload: User;
    }
  | {
      type: 'auth/login';
      payload: User;
    }
  | {
      type: 'auth/logout';
    };

export default AuthAction;
