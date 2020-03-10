import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {fetchDasboard} from '../../store/actions/index';
import CalendarWidget from '../../components/Widgets/CalendarWidget';
import PayslipWidget from '../../components/Widgets/PayslipWidget';
import InformationWidget from '../../components/Widgets/InformationWidget';
import AnnouncementWidget from '../../components/Widgets/AnnouncementWidget';
import InformationListWidget from '../../components/Widgets/InformationListWidget';
import AnnouncementListWidget from '../../components/Widgets/AnnouncementListWidget';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.props.onPageRefreshed();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabIndex !== this.props.tabIndex) {
      Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
          currentTabIndex: this.props.tabIndex,
        },
      });
    }
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'sideDrawerToggle') {
      this.toggleDrawer();
    }
  }

  toggleDrawer = () => {
    const {componentId} = this.props;

    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  handleRefresh = () => {
    this.setState({refreshing: true});
    this.props.onPageRefreshed();
    this.setState({refreshing: false});
  };

  handlePayslipPress = async () => {
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex: 3,
      },
    });
  };

  handleInfoWidgetPress = async () => {
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex: 1,
      },
    });
  };

  handleAnnouncementWidgetPress = async () => {
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex: 2,
      },
    });
  };

  handleInfoListPress = info => {
    const title =
      info.title.length > 30 ? info.title.substr(0, 30) + '...' : info.title;

    const layout = {
      component: {
        name: 'eslip.InformationDetailScreen',
        passProps: {
          information: info,
        },
        options: {
          topBar: {
            title: {
              text: title,
            },
          },
        },
      },
    };
    Navigation.push(this.props.componentId, layout);
  };

  handleAnnouncementListPress = announcement => {
    const title =
      announcement.title.length > 30
        ? announcement.title.substr(0, 30) + '...'
        : announcement.title;
    const layout = {
      component: {
        name: 'eslip.AnnouncementDetailScreen',
        passProps: {
          announcement: announcement,
        },
        options: {
          topBar: {
            title: {
              text: title,
            },
          },
        },
      },
    };
    Navigation.push(this.props.componentId, layout);
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        }>
        <View style={styles.widgetContainer}>
          <View style={styles.widgetColumn}>
            <CalendarWidget />
          </View>
          <View style={styles.widgetColumn}>
            <PayslipWidget onPress={this.handlePayslipPress} />
          </View>
        </View>
        <View style={styles.widgetContainer}>
          <View style={styles.widgetColumn}>
            <InformationWidget
              title={this.props.informationCount}
              onPress={this.handleInfoWidgetPress}
            />
          </View>
          <View style={styles.widgetColumn}>
            <AnnouncementWidget
              title={this.props.announcementCount}
              onPress={this.handleAnnouncementWidgetPress}
            />
          </View>
        </View>
        <View style={styles.panelContainer}>
          <InformationListWidget
            data={this.props.latestInformations}
            onPress={this.handleInfoListPress}
          />
        </View>
        <View style={styles.panelContainer}>
          <AnnouncementListWidget
            data={this.props.latestAnnouncements}
            onPress={this.handleAnnouncementListPress}
          />
        </View>
      </ScrollView>
    );
  }
}

const device = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  widgetColumn: {
    width: '45%',
    height: device.width * 0.45,
    margin: 5,
  },
  panelContainer: {
    width: '93%',
  },
});

const mapStateToProps = state => {
  return {
    informationCount: state.dashboard.informationToday,
    announcementCount: state.dashboard.announcementToday,
    latestInformations: state.dashboard.latestInformation,
    latestAnnouncements: state.dashboard.latestAnnouncement,
    tabIndex: state.tab.tabIndex,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPageRefreshed: () => dispatch(fetchDasboard()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
