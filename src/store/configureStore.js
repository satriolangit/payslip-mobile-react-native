import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import placesReducer from './reducers/places';
import dashboardReducer from './reducers/dashboard';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  places: placesReducer,
  dashboard: dashboardReducer,
  auth: authReducer,
});

const initialState = {};
const middleware = [thunk];

const configureStore = () => {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};

export default configureStore;
