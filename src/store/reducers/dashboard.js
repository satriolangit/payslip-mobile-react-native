import {FETCH_DASHBOARD} from '../actions/actionTypes';

const initialState = {
  announcementToday: 0,
  informationToday: 0,
  latestInformation: [],
  latestAnnouncement: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD:
      return {
        ...state,
        announcementToday: action.payload.announcementToday,
        informationToday: action.payload.informationToday,
        latestInformation: action.payload.latestInformation,
        latestAnnouncement: action.payload.latestAnnouncement,
      };

    default:
      return state;
  }
};

export default reducer;
