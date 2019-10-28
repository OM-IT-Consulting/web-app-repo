import { serviceConnector } from '../../../services/api';

export const AUTHENTICATEUSER = 'AUTHENTICATEUSER';

export function authenticateUser(username, userpassword) {
  return {
    type: AUTHENTICATEUSER,
    payload: serviceConnector('login.json', 'GET',{}, { username, userpassword })
  };
}

