import {LOAD_DASHBOARD_DATA} from '../actions/actionTypes';

const initialState = {
  announcementToday: 0,
  informationToday: 0,
  informations: [],
  announcements: [],
};

const infoList = [
  {
    id: '1',
    title: 'Informasi 1',
    text: '<p>Informasi 1 text</p>',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
  {
    id: '2',
    title: 'Informasi 2',
    text: '<p>Informasi 2 text</p>',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
  {
    id: '3',
    title: 'Informasi 3',
    text: 'Informasi 3 text',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
  {
    id: '4',
    title: 'Informasi 4',
    text: 'Informasi 4 text',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
  {
    id: '5',
    title: 'Informasi 5',
    text: 'Informasi 5 text',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
];

const announcementList = [
  {
    id: '1',
    title: 'Announcement 1',
    text: '<p>Announcement text</p>',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
  {
    id: '2',
    title: 'Announcement 2',
    text: '<p>Announcement 2 text</p>',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
  {
    id: '3',
    title: 'Announcement 3',
    text: 'Announcement 3 text',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
  {
    id: '4',
    title: 'Announcement 4',
    text: 'Announcement 4 text',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
  {
    id: '5',
    title: 'Announcement 5',
    text: 'Announcement 5 text',
    created_by: '1',
    created_on: '2020-03-03 10:00:00',
    updated_by: '1',
    updated_on: '',
  },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DASHBOARD_DATA:
      return {
        ...state,
        announcementToday: 5,
        informationToday: 8,
        informations: infoList,
        announcements: announcementList,
      };

    default:
      return state;
  }
};

export default reducer;
