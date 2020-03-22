/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Navigation} from 'react-native-navigation';
import {
  Container,
  Header,
  Body,
  Right,
  Button,
  Icon,
  Title,
  CheckBox,
} from 'native-base';

import {API_URL} from '../../../appSetting';
import SearchBox from '../../components/SearchBox/SearchBox';
import ListItem from '../../components/InformationListItem/InformationListItem';

// eslint-disable-next-line react-native/no-inline-styles

class InformationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      data: [],
      page: 1,
      isSelectAll: false,
      loading: false,
    };

    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.handleFetch();
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

  fetchData = async page => {
    try {
      let url = API_URL + 'information/page/' + page;
      const res = await axios.get(url);

      this.setState({data: res.data.data});
    } catch (err) {
      console.log(err);
    }
  };

  handleFetch = async () => {
    this.setState({isRefreshing: true});
    await this.fetchData(this.state.page);
    this.setState({isRefreshing: false});
  };

  handleLoadMore = () => {
    if (!this.state.loading) {
      this.setState({isRefreshing: true});
      this.setState({page: this.state.page + 1});
      this.fetchUser(this.state.page);
      this.setState({isRefreshing: false});
    }
  };

  handleSearch = keyword => {};

  handleCheckAll = () => {};

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) {
      return null;
    }
    return <ActivityIndicator style={{color: '#000'}} />;
  };

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
      <Container>
        <Header>
          <Body>
            <Title>Information</Title>
          </Body>
          <Right>
            <SearchBox onChangeText={this.handleSearch} />
            <CheckBox onPress={this.handleCheckAll} />
            <Button transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              onRefresh={this.handleFetch}
              refreshing={this.state.isRefreshing}
            />
          }
          renderItem={({item}) => (
            <ListItem
              data={item}
              onCheckedChanged={() => Alert('Checked Changed')}
              onLongPress={() => Alert('Long Pressed')}
              onPressDelete={() => Alert('Delete pressed')}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.4}
          onEndReached={this.handleLoadMore}
        />
      </Container>
    );
  }
}

export default InformationList;
