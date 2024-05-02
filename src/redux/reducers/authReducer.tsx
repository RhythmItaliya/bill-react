// reducers/authReducer.tsx
import { SET_TOKEN, SET_USER_DATA } from '../actions';

interface AuthState {
  userData: any | null;
  token: any | null;
}

interface Action {
  type: any;
  payload: any | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('_Xdata') || null,
  userData: localStorage.getItem('_XuserData') ? JSON.parse(localStorage.getItem('_XuserData')!) : null,
};

export type AuthStateType = {
  token: any | null;
  userData: any | null;
}

const authReducer = (state: AuthState = initialState, action: Action): AuthState => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem('_Xdata', action.payload || '');
      return { ...state, token: action.payload };
    case SET_USER_DATA:
      localStorage.setItem('_XuserData', JSON.stringify(action.payload));
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default authReducer;