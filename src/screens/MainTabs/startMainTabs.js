import {Navigation} from 'react-native-navigation';
import IonIcon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    IonIcon.getImageSource('ios-menu', 30),
    IonIcon.getImageSource('md-home', 30),
    IonIcon.getImageSource('md-book', 30),
    IonIcon.getImageSource('md-bookmarks', 30),
    IonIcon.getImageSource('md-mail', 30),
  ]).then(
    ([menuIcon, dashboardIcon, infoIcon, announcementIcon, payslipIcon]) => {
      const dashboardTab = {
        name: 'eslip.DashboardScreen',
        options: {
          bottomTab: {
            text: 'Home',
            fontSize: 12,
            icon: dashboardIcon,
          },
          topBar: {
            visible: true,
            title: {
              text: 'Home',
            },
            leftButtons: {
              id: 'sideDrawerToggle',
              icon: dashboardIcon,
            },
          },
        },
      };

      const informationTab = {
        name: 'eslip.InformationScreen',
        options: {
          bottomTab: {
            text: 'Informasi',
            fontSize: 12,
            icon: infoIcon,
          },
          topBar: {
            visible: true,
            title: {
              text: 'Informasi',
            },
            leftButtons: {
              id: 'sideDrawerToggle',
              icon: menuIcon,
            },
          },
        },
      };

      const announcementTab = {
        name: 'eslip.AnnouncementScreen',
        options: {
          bottomTab: {
            fontSize: 12,
            text: 'Pengumuman',
            icon: announcementIcon,
          },
          topBar: {
            visible: true,
            title: {
              text: 'Pengumuman',
            },
            leftButtons: {
              id: 'sideDrawerToggle',
              icon: menuIcon,
            },
          },
        },
      };

      const payslipTab = {
        name: 'eslip.Payslip',
        options: {
          bottomTab: {
            fontSize: 12,
            text: 'Payslip',
            icon: payslipIcon,
          },
          topBar: {
            visible: true,
            title: {
              text: 'Pasylip',
            },
            leftButtons: {
              id: 'sideDrawerToggle',
              icon: menuIcon,
            },
          },
        },
      };

      const mainTabs = {
        id: 'mainTabsId',
        children: [
          {
            stack: {
              children: [
                {
                  component: dashboardTab,
                },
              ],
            },
          },
          {
            stack: {
              children: [
                {
                  component: informationTab,
                },
              ],
            },
          },
          {
            stack: {
              children: [
                {
                  component: announcementTab,
                },
              ],
            },
          },
          {
            stack: {
              children: [
                {
                  component: payslipTab,
                },
              ],
            },
          },
        ],
        options: {
          topBar: {
            visible: true,
            alignment: 'center',
          },
        },
      };

      Navigation.setRoot({
        root: {
          sideMenu: {
            left: {
              component: {
                id: 'mySideDrawer',
                name: 'eslip.SideDrawer',
              },
            },
            center: {
              bottomTabs: mainTabs,
            },
          },
        },
      });
    },
  );
};

export default startTabs;
