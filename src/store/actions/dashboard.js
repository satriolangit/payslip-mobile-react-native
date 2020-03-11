import {FETCH_DASHBOARD} from './actionTypes';
import axios from 'axios';

import {API_URL} from '../../../appSetting';

export const fetchDasboard = () => async dispatch => {
  try {
    const informationToday = await getInformationToday();
    const announcementToday = await getAnnouncementToday();
    const latestInformation = await getLatestInformation();
    const latestAnnouncement = await getLatestAnnouncement();

    console.log(latestAnnouncement);

    dispatch({
      type: FETCH_DASHBOARD,
      payload: {
        informationToday,
        announcementToday,
        latestInformation,
        latestAnnouncement,
      },
    });
  } catch (error) {}
};

const getInformationToday = async () => {
  try {
    const res = await axios.get(API_URL + 'information/today/count');
    return res.data.data;
  } catch (error) {
    console.log('ERROR getInformationToday', error);

    return 0;
  }
};

const getAnnouncementToday = async () => {
  try {
    const res = await axios.get(API_URL + 'announcement/today/count');
    return res.data.data;
  } catch (error) {
    console.log('ERROR getAnnouncementToday', error);

    return 0;
  }
};

const getLatestInformation = async () => {
  try {
    const res = await axios.get(API_URL + 'information/latest');
    return res.data.data;
  } catch (error) {
    console.log('ERROR getLatestInformations', error);

    return [];
  }
};

const getLatestAnnouncement = async () => {
  try {
    const res = await axios.get(API_URL + 'announcement/latest');
    return res.data.data;
  } catch (error) {
    console.log('ERROR getLatestAnnouncement', error);

    return [];
  }
};
