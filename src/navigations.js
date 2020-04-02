import {Navigation} from 'react-native-navigation';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const startApp = (tabIndex = 0) => {
  console.log('tabIndex:', tabIndex);

  Promise.all([
    IonIcon.getImageSource('md-menu', 30),
    SimpleIcon.getImageSource('speedometer', 30),
    SimpleIcon.getImageSource('book-open', 30),
    SimpleIcon.getImageSource('bell', 30),
    SimpleIcon.getImageSource('docs', 30),
    // SimpleIcon.getImageSource('grid', 30),
  ]).then(
    ([menuIcon, dashboardIcon, infoIcon, announcementIcon, payslipIcon]) => {
      const dashboardTab = {
        name: 'eslip.DashboardScreen',
        options: {
          bottomTab: {
            text: 'Dashboard',
            fontSize: 12,
            icon: dashboardIcon,
            background: {
              color: '#ccc',
              translucent: false,
            },
          },
          topBar: {
            visible: true,
            background: {
              component: {
                name: 'eslip.TopBar',
              },
            },
            leftButtons: {
              id: 'sideDrawerToggle',
              icon: menuIcon,
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
        name: 'eslip.PayslipScreen',
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

export const goToAnnouncement = () => {
  Promise.all([
    IonIcon.getImageSource('md-menu', 30),
    SimpleIcon.getImageSource('speedometer', 30),
    SimpleIcon.getImageSource('book-open', 30),
    SimpleIcon.getImageSource('bell', 30),
    SimpleIcon.getImageSource('docs', 30),
    SimpleIcon.getImageSource('grid', 30),
  ]).then(
    ([
      menuIcon,
      dashboardIcon,
      infoIcon,
      announcementIcon,
      payslipIcon,
      gridIcon,
    ]) => {
      const dashboardTab = {
        name: 'eslip.DashboardScreen',
        options: {
          bottomTab: {
            text: 'Dashboard',
            fontSize: 12,
            icon: dashboardIcon,
            background: {
              color: '#ccc',
              translucent: false,
            },
          },
          topBar: {
            visible: true,
            background: {
              component: {
                name: 'eslip.TopBar',
              },
            },
            leftButtons: {
              id: 'sideDrawerToggle',
              icon: gridIcon,
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
        name: 'eslip.PayslipScreen',
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
        currentTabIndex: 2,
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

export const goToPayslip = () => {
  Promise.all([
    IonIcon.getImageSource('md-menu', 30),
    SimpleIcon.getImageSource('speedometer', 30),
    SimpleIcon.getImageSource('book-open', 30),
    SimpleIcon.getImageSource('bell', 30),
    SimpleIcon.getImageSource('docs', 30),
    SimpleIcon.getImageSource('grid', 30),
  ]).then(
    ([
      menuIcon,
      dashboardIcon,
      infoIcon,
      announcementIcon,
      payslipIcon,
      gridIcon,
    ]) => {
      const dashboardTab = {
        name: 'eslip.DashboardScreen',
        options: {
          bottomTab: {
            text: 'Dashboard',
            fontSize: 12,
            icon: dashboardIcon,
            background: {
              color: '#ccc',
              translucent: false,
            },
          },
          topBar: {
            visible: true,
            background: {
              component: {
                name: 'eslip.TopBar',
              },
            },
            leftButtons: {
              id: 'sideDrawerToggle',
              icon: gridIcon,
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
        name: 'eslip.PayslipScreen',
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
        currentTabIndex: 3,
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

export const goToLogin = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'eslip.LoginScreen',
        options: {
          topBar: {
            visible: true,
            title: 'Login',
          },
        },
      },
    },
  });
};

export const goToInformation = () => {
  Promise.all([
    IonIcon.getImageSource('md-menu', 30),
    SimpleIcon.getImageSource('speedometer', 30),
    SimpleIcon.getImageSource('book-open', 30),
    SimpleIcon.getImageSource('bell', 30),
    SimpleIcon.getImageSource('docs', 30),
    SimpleIcon.getImageSource('grid', 30),
  ]).then(
    ([
      menuIcon,
      dashboardIcon,
      infoIcon,
      announcementIcon,
      payslipIcon,
      gridIcon,
    ]) => {
      const dashboardTab = {
        name: 'eslip.DashboardScreen',
        options: {
          bottomTab: {
            text: 'Dashboard',
            fontSize: 12,
            icon: dashboardIcon,
            background: {
              color: '#ccc',
              translucent: false,
            },
          },
          topBar: {
            visible: true,
            background: {
              component: {
                name: 'eslip.TopBar',
              },
            },
            leftButtons: {
              id: 'sideDrawerToggle',
              icon: gridIcon,
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
        name: 'eslip.PayslipScreen',
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
        currentTabIndex: 1,
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

export const goToInformationList = () => {
  Promise.all([IonIcon.getImageSource('md-menu', 30)]).then(([menuIcon]) => {
    const informationListScreen = {
      name: 'eslip.InformationListScreen',
      options: {
        topBar: {
          visible: true,
          background: {
            component: {
              name: 'eslip.TopBar',
            },
          },
          leftButtons: {
            id: 'sideDrawerToggle',
            icon: menuIcon,
          },
        },
      },
    };

    const stack = {
      children: [
        {
          component: informationListScreen,
        },
      ],
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
            stack: stack,
          },
        },
      },
    });
  });
};

export const goToAnnouncementList = () => {
  Promise.all([IonIcon.getImageSource('md-menu', 30)]).then(([menuIcon]) => {
    const announcementListScreen = {
      name: 'eslip.AnnouncementListScreen',
      options: {
        topBar: {
          visible: true,
          background: {
            component: {
              name: 'eslip.TopBar',
            },
          },
          leftButtons: {
            id: 'sideDrawerToggle',
            icon: menuIcon,
          },
        },
      },
    };

    const stack = {
      children: [
        {
          component: announcementListScreen,
        },
      ],
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
            stack: stack,
          },
        },
      },
    });
  });
};

export const goToUserList = () => {
  Promise.all([IonIcon.getImageSource('md-menu', 30)]).then(([menuIcon]) => {
    const screen = {
      name: 'eslip.UserListScreen',
      options: {
        topBar: {
          visible: true,
          background: {
            component: {
              name: 'eslip.TopBar',
            },
          },
          leftButtons: {
            id: 'sideDrawerToggle',
            icon: menuIcon,
          },
        },
      },
    };

    const stack = {
      children: [
        {
          component: screen,
        },
      ],
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
            stack: stack,
          },
        },
      },
    });
  });
};

export const goToPayslipList = () => {
  Promise.all([IonIcon.getImageSource('md-menu', 30)]).then(([menuIcon]) => {
    const screen = {
      name: 'eslip.PayslipListScreen',
      options: {
        topBar: {
          visible: true,
          background: {
            component: {
              name: 'eslip.TopBar',
            },
          },
          leftButtons: {
            id: 'sideDrawerToggle',
            icon: menuIcon,
          },
        },
      },
    };

    const stack = {
      children: [
        {
          component: screen,
        },
      ],
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
            stack: stack,
          },
        },
      },
    });
  });
};

export const goToFileList = () => {
  Promise.all([IonIcon.getImageSource('md-menu', 30)]).then(([menuIcon]) => {
    const screen = {
      name: 'eslip.FileListScreen',
      options: {
        topBar: {
          visible: true,
          background: {
            component: {
              name: 'eslip.TopBar',
            },
          },
          leftButtons: {
            id: 'sideDrawerToggle',
            icon: menuIcon,
          },
        },
      },
    };

    const stack = {
      children: [
        {
          component: screen,
        },
      ],
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
            stack: stack,
          },
        },
      },
    });
  });
};
