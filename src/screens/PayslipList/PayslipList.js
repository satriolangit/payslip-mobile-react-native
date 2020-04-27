/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Navigation} from 'react-native-navigation';
import {
  Container,
  Header,
  Button,
  Icon,
  Input,
  Item,
  Fab,
  Root,
} from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';

import {
  API_URL,
  API_JSON_HEADER,
  PAYSLIP_URL,
  LIST_PAGE_SIZE,
} from '../../../appSetting';
import ListItem from '../../components/PayslipListItem/PayslipListItem';
import {showDangerToast} from '../../helper';

class PayslipList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      data: [],
      page: 1,
      isSelectAll: false,
      loading: false,
      selectedItems: [],
      active: false,
      isSearch: false,
      totalData: 0,
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

  fetchData = async (page = 1) => {
    try {
      let url = `${API_URL}payslip/page/${page}/${LIST_PAGE_SIZE}`;

      const res = await axios.get(url);

      const data = res.data.data.map(item => {
        item.isSelected = false;
        item.selectedClass = styles.list;
        return item;
      });

      //this.setState({data: data});
      console.log(data.length, 'totalData:', res.data.totalData, data);
      this.setState({totalData: res.data.totalData});

      return data;
    } catch (err) {
      //showDangerToast(err);
      console.log(err);
    }
  };

  handleRefresh = async () => {
    this.setState({isRefreshing: true, page: 1});
    const data = await this.fetchData(this.state.page);
    this.setState({data: data, isRefreshing: false});

    console.log('data: ' + this.state.data.length);
  };

  handleLoadMore = async () => {
    if (!this.state.loading && !this.state.isSearch) {
      this.setState({isRefreshing: true});
      this.setState({page: this.state.page + 1});
      const moreData = await this.fetchData(this.state.page);

      this.setState({
        isRefreshing: false,
        data: [...this.state.data, ...moreData],
      });

      //console.log(this.state.data);
    }
  };

  handleSelectItem = item => {
    item.isSelected = !item.isSelected;
    item.selectedClass = item.isSelected ? styles.selected : {};

    const index = this.state.data.findIndex(x => item.id === x.id);
    this.state.data[index] = item;
    this.setState({
      data: this.state.data,
    });

    if (item.isSelected) {
      this.setState({selectedItems: [...this.state.selectedItems, item.idx]});
    } else {
      this.setState({
        selectedItems: this.state.selectedItems.filter(x => x !== item.idx),
      });
    }
  };

  handleSearch = async keywords => {
    try {
      const url = API_URL + 'payslip/search';
      const res = await axios.post(url, {keywords}, API_JSON_HEADER);

      const data = res.data.data.map(item => {
        item.isSelected = false;
        item.selectedClass = styles.list;
        return item;
      });

      //console.log(data);

      this.setState({data: data, isSearch: keywords.length > 0});

      //console.log(this.state.data);
    } catch (err) {
      console.log(err);
    }
  };

  handleSelectAll = () => {
    this.setState({isSelectAll: !this.state.isSelectAll});

    const selectAll = this.state.data.map(item => {
      item.isSelected = this.state.isSelectAll;
      item.selectedClass = item.isSelected ? styles.selected : {};
      return item;
    });

    this.setState({
      data: selectAll,
      active: false,
      selectedItems: this.state.isSelectAll
        ? selectAll.map(item => item.idx)
        : [],
    });
  };

  handleDelete = async () => {
    const {selectedItems} = this.state;

    if (selectedItems.length > 0) {
      try {
        const url = API_URL + 'payslip/deletes';
        await axios.post(url, {ids: selectedItems}, API_JSON_HEADER);

        this.setState({isRefreshing: true});
        const data = await this.fetchData(1);

        this.setState({data: data, isRefreshing: false, selectedItems: []});
      } catch (err) {
        //showDangerToast(err);
        console.log(err);
      }
    }

    this.setState({active: false});
    // console.log('selectedItems:', this.state.selectedItems);
  };

  handleUpload = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'eslip.UploadPayslipScreen',
        passProps: {
          data: null,
        },
        options: {
          topBar: {
            title: {
              text: 'Upload Payslip',
            },
          },
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

  handleDownload = filename => {
    try {
      this.download(filename);
    } catch (error) {
      Alert.alert(
        'Gagal',
        'Download payslip gagal, silahkan cek permission di hp anda',
      );

      console.log(error);
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#ccc',
        }}
      />
    );
  };

  renderFooter = () => {
    if (
      !this.state.data ||
      this.state.isSearch ||
      this.state.totalData <= LIST_PAGE_SIZE
    ) {
      return null;
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#2f353a',
          padding: 10,
        }}>
        <TouchableOpacity onPress={this.handleLoadMore}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFF',
            }}>
            More
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderFab = () => (
    <Fab
      active={this.state.active}
      direction="up"
      containerStyle={{}}
      style={{backgroundColor: '#5067FF'}}
      position="bottomRight"
      onPress={() => this.setState({active: !this.state.active})}>
      <Icon name="md-apps" />
      <Button style={{backgroundColor: '#34A34F'}} onPress={this.handleUpload}>
        <Icon name="md-cloud-upload" />
      </Button>
      <Button
        style={{backgroundColor: '#3B5998'}}
        onPress={this.handleSelectAll}>
        <Icon name="md-checkmark" />
      </Button>
      <Button style={{backgroundColor: '#DD5144'}} onPress={this.handleDelete}>
        <Icon name="md-trash" />
      </Button>
    </Fab>
  );

  render() {
    if (this.state.loading && this.state.page === 1) {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <ActivityIndicator style={{color: '#000'}} />
        </View>
      );
    }

    return (
      <Root>
        <Container>
          <Header searchBar rounded style={styles.header}>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onChangeText={text => this.handleSearch(text)}
              />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <View style={{flex: 1}}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              refreshControl={
                <RefreshControl
                  onRefresh={this.handleRefresh}
                  refreshing={this.state.isRefreshing}
                />
              }
              renderItem={({item}) => (
                <ListItem
                  data={item}
                  onSelected={() => this.handleSelectItem(item)}
                  onLongPress={() => this.handleSelectItem(item)}
                  onPress={() => this.handleDownload(item.filename)}
                  style={item.selectedClass}
                  selected={item.isSelected}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
            />
            {this.renderFab()}
          </View>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2f353a',
  },
  selected: {backgroundColor: '#cece'},
});

export default PayslipList;
