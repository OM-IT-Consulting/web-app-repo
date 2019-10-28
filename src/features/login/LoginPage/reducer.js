import { AUTHENTICATEUSER } from '../../login/LoginPage/action';

const INITIAL_STATE = { };


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHENTICATEUSER:// start authenticating the user and set loading = true
      console.log('login reducer called');
      return { ...state, userData: { dashBoardTypes: [], error: null, loading: true } };
    default:
      return state;
  }
}
