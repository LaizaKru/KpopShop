import { combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useDispatch } from 'react-redux';
import authReducer from './auth/reducer';
import cardReducer from './cards/reducer';
import gameReducer from './game/reducer';
import musicReducer from './music/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cards: cardReducer,
  game: gameReducer,
  music: musicReducer,
});
export const store = createStore(rootReducer, composeWithDevTools());
export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
