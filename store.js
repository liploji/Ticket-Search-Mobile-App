import { createStore, combineReducers } from 'redux';

// Reducers
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  events: eventReducer,
});

const store = createStore(rootReducer);

export default store;
