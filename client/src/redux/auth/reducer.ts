import AuthAction from './types/authAction';
import AuthState from './types/authState';

const initState: AuthState = {
  user: null,
};
function reducer(state: AuthState = initState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'auth/reg':
      return { ...state, user: action.payload };
    case 'auth/login':
      return { ...state, user: action.payload };
    case 'auth/logout':
      return { ...state, user: null };
    default:
      return state;
  }
}
export default reducer;
