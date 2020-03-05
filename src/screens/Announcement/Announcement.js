import React, {Component} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import axios from 'axios';
import {Navigation} from 'react-native-navigation';

import ListItem from '../../components/UI/CardListItem/CardListItem';
import {API_URL} from '../../../appSetting';

class AnnouncementScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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

  handleItemPressed = item => {
    const title =
      item.title.length > 30 ? item.title.substr(0, 30) + '...' : item.title;
    Navigation.push(this.props.componentId, {
      component: {
        name: 'eslip.AnnouncementDetailScreen',
        passProps: {
          announcement: item,
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

  handleRefresh = async () => {
    this.setState({isRefreshing: true});
    try {
      let url = API_URL + 'announcement';
      const res = await axios.get(url);

      this.setState({data: res.data.data});
    } catch (err) {
      console.log(err);
    }
    this.setState({isRefreshing: false});
  };

  render() {
    return (
      <FlatList
        style={styles.listContainer}
        data={this.state.data}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
          />
        }
        renderItem={({item}) => (
          <ListItem
            item={item}
            onPress={() => this.handleItemPressed(item)}
            key={item.id}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    padding: 5,
  },
});

export default AnnouncementScreen;
