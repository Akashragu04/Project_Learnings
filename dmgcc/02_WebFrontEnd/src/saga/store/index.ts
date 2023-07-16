import { applyMiddleware, createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reducers from "../Reducer";
import reduxSaga from 'redux-saga';
import rootSaga from '../sagas';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  ...reducers,
});
export type AppState = ReturnType<typeof rootReducer>;

const createBrowserHistory = require("history").createBrowserHistory;
const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {};
const reduxSagaMiddleware = reduxSaga();
export const store = createStore(persistedReducer, initialState, applyMiddleware(reduxSagaMiddleware));
export const persistor: any = persistStore(store)
reduxSagaMiddleware.run(rootSaga)

export { history };