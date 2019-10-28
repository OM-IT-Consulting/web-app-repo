import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import promise from 'redux-promise';

// Middleware you want to use in the application:
const enhancer = applyMiddleware(promise);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
