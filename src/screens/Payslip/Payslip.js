import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {API_URL} from '../../../appSetting';

class PayslipScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payslip: null,
      isRefreshing: false,
    };

    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.handleRefresh();
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

  handleItemPressed = async filename => {
    //get base64
    try {
      const url = API_URL + 'payslip/open/' + filename;
      const res = await axios.get(url);
      const pdf = res.data;
      const source = {uri: 'data:application/pdf;base64,' + pdf};

      Navigation.push(this.props.componentId, {
        component: {
          name: 'eslip.PayslipDetailScreen',
          passProps: {
            source: source,
          },
          options: {
            topBar: {
              title: {
                text: 'Detail',
              },
            },
          },
        },
      });
    } catch (error) {
      Alert.alert('Failed to open file');
      console.log('error:', error);
    }
  };

  handleRefresh = async () => {
    this.setState({isRefreshing: true});
    try {
      const url = API_URL + 'payslip/' + this.props.user.employee_id + '/1';
      console.log(url);
      const res = await axios.get(url);
      console.log(res.data);
      const payslip = res.data.data[0];
      this.setState({isRefreshing: false, payslip});
    } catch (error) {
      Alert.alert('Failed to fetch payslip');
      console.log(error);
      this.setState({isRefreshing: false});
    }
  };

  renderFooterText = () => {
    const month = moment()
      .month(this.state.payslip.month)
      .format('MMMM');

    return (
      <Text styles={styles.cardFooterText}>
        {month + ' ' + this.state.payslip.year}
      </Text>
    );
  };

  renderNoData = () => (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this.handleRefresh}
        />
      }>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.heading}>Payslip file</Text>
        </View>
        <View style={styles.cardItem}>
          <Icon name="doc" size={30} color="#aaa" style={styles.icon} />
          <Text style={styles.cardItemText}>'Tidak ada data'</Text>
        </View>
      </View>
    </ScrollView>
  );

  render() {
    if (this.state.payslip === null) {
      return (
        <View style={styles.card}>
          <Text>Tidak ada data</Text>
        </View>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.handleRefresh}
            />
          }>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.heading}>Payslip file</Text>
            </View>
            <TouchableOpacity
              onPress={this.handleItemPressed}
              activeOpacity={0.8}>
              <View style={styles.cardItem}>
                <Icon name="doc" size={30} color="#aaa" style={styles.icon} />
                <Text style={styles.cardItemText}>
                  {this.state.payslip.filename}
                </Text>
              </View>
            </TouchableOpacity>
            <View styles={styles.cardFooter}>{this.renderFooterText()}</View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    margin: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
  },
  cardHeader: {
    backgroundColor: '#2f353a',
    padding: 5,
  },
  cardItem: {
    flexDirection: 'row',
    padding: 5,
  },
  heading: {
    fontSize: 24,
    color: 'white',
  },
  icon: {
    marginRight: 5,
  },
  cardItemText: {
    fontSize: 16,
  },
  cardFooter: {
    padding: 5,
  },
  cardFooterText: {
    fontSize: 18,
  },
});

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(PayslipScreen);
