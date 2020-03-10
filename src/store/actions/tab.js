import {CHANGE_TAB_INDEX} from './actionTypes';

export const cangeTab = index => {
  return {
    type: CHANGE_TAB_INDEX,
    payload: index,
  };
};
