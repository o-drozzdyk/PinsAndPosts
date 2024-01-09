import { createStore } from 'redux';
// import rootReducer from './reducers'; // Припустимо, у вас є файли з редукторами

import { combineReducers } from 'redux';
import advertisementReducer from '../features/advertisements';
import regionsReducer from '../features/regions';
import modalReducer from '../features/modal';
import mapModalReducer from '../features/mapModal';

const rootReducer = combineReducers({
  advertisements: advertisementReducer,
  regions: regionsReducer,
  modal: modalReducer,
  mapModal: mapModalReducer,
  // Додайте інші редуктори тут, якщо необхідно
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
