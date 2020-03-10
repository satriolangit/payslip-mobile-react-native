import {CHANGE_TAB_INDEX} from '../actions/actionTypes';

const initialState = {
  tabIndex: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TAB_INDEX:
      return {
        ...state,
        tabIndex: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
