import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {Navigation} from 'react-native-navigation';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL, PAYSLIP_URL, API_JSON_HEADER} from '../../../appSetting';

class PayslipScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payslip: null,
      isRefreshing: false,
      isStoragePermissionGranted: false,
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

  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Download Permission',
          message:
            'Eslip membutuhkan akses internal storage untuk menyimpan data',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({isStoragePermissionGranted: true});
        console.log('You write external storage');
      } else {
        console.log('write external storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  download = async filename => {
    await this.requestPermission();

    if (!this.state.isStoragePermissionGranted) {
      return;
    }

    const url = PAYSLIP_URL + filename;
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;

    let opts = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: DownloadDir + '/' + filename,
        description: 'Pdf',
      },
    };

    config(opts)
      .fetch('GET', url)
      .then(res => {
        Alert.alert('Download selesai', opts.addAndroidDownloads.path);
        //const android = RNFetchBlob.android;
        //android.actionViewIntent(opts.path, 'application/pdf');
      });
  };

  updateLastDownload = async filename => {
    try {
      const url = API_URL + 'payslip/download';
      await axios.post(url, {filename: filename}, API_JSON_HEADER);
    } catch (error) {
      console.log('updateLastDownlaod: ', error);
    }
  };

  handleItemPressed = async filename => {
    try {
      await this.download(filename);
      await this.updateLastDownload(filename);
    } catch (error) {
      Alert(
        'Gagal',
        'Download payslip gagal, silahkan cek permission di hp anda',
      );

      console.log(error);
    }
  };

  handleRefresh = async () => {
    this.setState({isRefreshing: true});
    try {
      const url = API_URL + 'payslip/' + this.props.user.employee_id + '/1';
      // console.log(url);
      const res = await axios.get(url);
      // console.log(res.data);
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

  renderFileDate = () => {
    const month = moment()
      .month(this.state.payslip.month)
      .format('MMMM');

    return month + ' ' + this.state.payslip.year;
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
    if (
      typeof this.state.payslip === 'undefined' ||
      this.state.payslip === null
    ) {
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
            <Text>Tidak ada data</Text>
          </View>
        </ScrollView>
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
              <Text style={styles.heading}>
                Payslip {this.renderFileDate()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.handleItemPressed(this.state.payslip.filename)
              }
              activeOpacity={0.8}>
              <View style={styles.cardItem}>
                <Icon name="doc" size={30} color="#aaa" style={styles.icon} />
                <Text style={styles.cardItemText}>
                  {this.state.payslip.filename}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }
}

const width = Dimensions.get('window').width;
const fontSize = 0.03 * width;

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
    fontSize: fontSize,
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
