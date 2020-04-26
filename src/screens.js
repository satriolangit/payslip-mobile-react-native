import {Navigation} from 'react-native-navigation';
import TopBar from './components/UI/TopBar/TopBar';
import App from '../App';

import {
  DashboardScreen,
  SideDrawer,
  LoginScreen,
  InformationScreen,
  InformationDetailScreen,
  InformationListScreen,
  InformationFormScreen,
  AnnouncementScreen,
  AnnouncementDetailScreen,
  AnnouncementListScreen,
  AnnouncementFormScreen,
  PayslipListScreen,
  PayslipScreen,
  PayslipDetailScreen,
  UserListScreen,
  UserFormScreen,
  ZoomImageScreen,
  FileListScreen,
  UploadFileScreen,
  UploadPayslipScreen,
  ChangePasswordScreen,
} from './screens/index';

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
  Navigation.registerComponent('eslip.App', () => App);
  Navigation.registerComponent('eslip.ZoomImage', () => ZoomImageScreen);
  Navigation.registerComponentWithRedux(
    'eslip.InformationListScreen',
    () => InformationListScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.InformationFormScreen',
    () => InformationFormScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.AnnouncementListScreen',
    () => AnnouncementListScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.AnnouncementFormScreen',
    () => AnnouncementFormScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.PayslipListScreen',
    () => PayslipListScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.UserListScreen',
    () => UserListScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.UserFormScreen',
    () => UserFormScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.FileListScreen',
    () => FileListScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.UploadFileScreen',
    () => UploadFileScreen,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'eslip.UploadPayslipScreen',
    () => UploadPayslipScreen,
    Provider,
    store,
  );
  Navigation.registerComponent(
    'eslip.ChangePasswordScreen',
    () => ChangePasswordScreen,
  );
};

export {registerScreens};
