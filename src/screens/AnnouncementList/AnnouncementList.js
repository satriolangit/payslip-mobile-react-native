import React, {Component} from 'react';
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Navigation} from 'react-native-navigation';
import {Container, Header, Button, Icon, Input, Item, Fab} from 'native-base';

import {API_URL, API_JSON_HEADER} from '../../../appSetting';

export default class AnnouncementList extends Component {
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

  handleAdd = () => {
    const title = 'Add Pengumuman';
    Navigation.push(this.props.componentId, {
      component: {
        name: 'eslip.AnnouncementFormScreen',
        passProps: {
          data: null,
        },
        options: {
          topBar: {
            title: {
              text: title,
            },
          },
        },
      },
    });
  };

  render() {
    return (
      <View>
        <Text>Announcement List</Text>
        <Button onPress={this.handleAdd}>
          <Text>Add</Text>
        </Button>
      </View>
    );
  }
}
