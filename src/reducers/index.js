import { combineReducers } from 'redux';
import LoginReducers from '../features/login/LoginPage/reducer';

const rootReducer = combineReducers({
  login: LoginReducers
});

export default rootReducer;
