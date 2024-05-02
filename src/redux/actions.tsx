// actions.tsx
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_DATA = 'SET_USER_DATA';

export const setToken = (token: any) => ({
  type: SET_TOKEN,
  payload: token,
});

export const setUserData = (userData: any) => ({
  type: SET_USER_DATA,
  payload: userData
});
