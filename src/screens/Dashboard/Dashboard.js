import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import axios from 'axios';

import {loadDashboardData} from '../../store/actions/index';
import CalendarWidget from '../../components/Widgets/CalendarWidget';
import PayslipWidget from '../../components/Widgets/PayslipWidget';
import InformationWidget from '../../components/Widgets/InformationWidget';
import AnnouncementWidget from '../../components/Widgets/AnnouncementWidget';
import InformationListWidget from '../../components/Widgets/InformationListWidget';
import AnnouncementListWidget from '../../components/Widgets/AnnouncementListWidget';
import {API_URL} from '../../../appSetting';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    Navigation.events().bindComponent(this);
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

  handleInfoListPress = async info => {
    try {
      const url = API_URL + 'connect';
      const res = await axios.get(url);

      Alert.alert('axios', res.data.result);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  componentDidMount() {
    this.props.onPageRefreshed();
  }

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
            <PayslipWidget />
          </View>
        </View>
        <View style={styles.widgetContainer}>
          <View style={styles.widgetColumn}>
            <InformationWidget title={this.props.informationCount} />
          </View>
          <View style={styles.widgetColumn}>
            <AnnouncementWidget title={this.props.announcementCount} />
          </View>
        </View>
        <View style={styles.panelContainer}>
          <InformationListWidget
            data={this.props.latestInformations}
            onPress={this.handleInfoListPress}
          />
        </View>
        <View style={styles.panelContainer}>
          <AnnouncementListWidget data={this.props.latestAnnouncements} />
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
    latestInformations: state.dashboard.informations,
    latestAnnouncements: state.dashboard.announcements,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPageRefreshed: () => dispatch(loadDashboardData()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
