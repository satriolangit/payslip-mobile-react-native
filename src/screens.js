import {Navigation} from 'react-native-navigation';

import DashboardScreen from './screens/Dashboard/Dashboard';
import SideDrawer from './screens/SideDrawer/SideDrawer';
import LoginScreen from './screens/Auth/Login';
import AnnouncementScreen from './screens/Announcement/Announcement';
import AnnouncementDetailScreen from './screens/Announcement/AnnouncementDetail';
import InformationScreen from './screens/Information/Information';
import InformationDetailScreen from './screens/Information/InformationDetail';
import PayslipScreen from './screens/Payslip/Payslip';
import PayslipDetailScreen from './screens/Payslip/PayslipDetail';
import TopBar from './components/UI/TopBar/TopBar';
import WelcomeScreen from './screens/Welcome/Welcome';

const registerScreens = (Provider, store) => {
  //Register Screens
  Navigation.registerComponentWithRedux(
    'eslip.SideDrawer',
    () => SideDrawer,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.DashboardScreen',
    () => DashboardScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.InformationScreen',
    () => InformationScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.InformationDetailScreen',
    () => InformationDetailScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.AnnouncementScreen',
    () => AnnouncementScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.AnnouncementDetailScreen',
    () => AnnouncementDetailScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.PayslipScreen',
    () => PayslipScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.PayslipDetailScreen',
    () => PayslipDetailScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.LoginScreen',
    () => LoginScreen,
    Provider,
    store,
  );
  Navigation.registerComponent('eslip.TopBar', () => TopBar);
  Navigation.registerComponent('eslip.WelcomeScreen', () => WelcomeScreen);
};

export {registerScreens};
