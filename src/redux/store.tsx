import { createStore, combineReducers, Reducer, Store } from 'redux';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';
import authReducer, { AuthStateType } from './reducers/authReducer';

export type RootStateType = {
    auth: AuthStateType;
};

const rootReducer: Reducer<RootStateType> = combineReducers<RootStateType>({
    auth: authReducer,
});

const store: Store<RootStateType> = createStore(rootReducer);

type ReduxProviderProps = {
    children: ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;