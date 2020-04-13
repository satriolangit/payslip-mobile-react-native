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

import {API_URL, API_JSON_HEADER, LIST_PAGE_SIZE} from '../../../appSetting';
import ListItem from '../../components/AnnouncementListItem/AnnouncementListItem';

class AnnouncementList extends Component {
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
      let url = `${API_URL}announcement/page/${page}/${LIST_PAGE_SIZE}`;
      const res = await axios.get(url);

      const data = res.data.data.map(item => {
        item.isSelected = false;
        item.selectedClass = styles.list;
        return item;
      });

      console.log(data.length, 'totalData:', res.data.totalData);
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
    this.setState({isRefreshing: false, data: data});
  };

  handleLoadMore = async () => {
    if (!this.state.loading && !this.state.isSearch) {
      this.setState({page: this.state.page + 1, isRefreshing: true});
      const moreData = await this.fetchData(this.state.page);

      this.setState({
        isRefreshing: false,
        data: [...this.state.data, ...moreData],
      });
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
      this.setState({selectedItems: [...this.state.selectedItems, item.id]});
    } else {
      this.setState({
        selectedItems: this.state.selectedItems.filter(x => x !== item.id),
      });
    }
  };

  handleSearch = async keywords => {
    try {
      const url = API_URL + 'announcement/search';
      const res = await axios.post(url, {keywords}, API_JSON_HEADER);

      const data = res.data.data.map(item => {
        item.isSelected = false;
        item.selectedClass = styles.list;
        return item;
      });

      this.setState({data: data, isSearch: keywords.length > 0});

      console.log(this.state.data);
    } catch (err) {
      console.log(err);
    }
  };

  handleSelectAll = () => {
    this.state.isSelectAll = !this.state.isSelectAll;

    const selectAll = this.state.data.map(item => {
      item.isSelected = this.state.isSelectAll;
      item.selectedClass = item.isSelected ? styles.selected : {};
      return item;
    });

    this.setState({
      data: selectAll,
      selectedItems: this.state.isSelectAll
        ? selectAll.map(item => item.id)
        : [],
    });
  };

  handleDelete = async () => {
    const {selectedItems} = this.state;

    if (selectedItems.length > 0) {
      try {
        const url = API_URL + 'announcement/multidelete';
        await axios.post(url, {ids: selectedItems}, API_JSON_HEADER);

        this.fetchData();
      } catch (err) {
        //showDangerToast(err);
        console.log(err);
      }
    }

    console.log('selectedItems:', this.state.selectedItems);
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

  handleEdit = item => {
    console.log('handleEdit');
    const title =
      item.title.length > 20 ? item.title.substr(0, 20) + '...' : item.title;
    console.log(item);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'eslip.AnnouncementFormScreen',
        passProps: {
          data: item,
        },
        options: {
          topBar: {
            title: {
              text: 'Edit ' + title,
            },
          },
        },
      },
    });
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
      <Button style={{backgroundColor: '#34A34F'}} onPress={this.handleAdd}>
        <Icon name="md-add" />
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
                  onPress={() => this.handleEdit(item)}
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

export default AnnouncementList;
