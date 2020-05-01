import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Accordion, Icon} from 'native-base';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';

import {logout, cangeTab} from '../../store/actions/index';
import UserPanel from '../../components/SideBarUserPanel/UserPanel';
import {
  goToInformationList,
  goToAnnouncementList,
  goToPayslipList,
  goToUserList,
  goToFileList,
  startApp,
} from '../../navigations';

class SideDrawer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    console.log('user:', this.props.user);
  }

  handleSignOut = () => {
    this.props.onSignOut();
  };

  handleItemPress = tabIndex => {
    startApp(tabIndex);

    //this.props.onTabChanged(tabIndex);
  };

  renderAdministration = role => {
    const items = [
      {title: 'Administration', content: 'Administrator Navigation'},
    ];

    const renderHeader = (item, expanded) => (
      <View style={styles.drawerItem}>
        {expanded ? (
          <Icon
            style={styles.drawerItemIcon}
            color="#aaa"
            name="ios-arrow-up"
          />
        ) : (
          <Icon
            style={styles.drawerItemIcon}
            color="#aaa"
            name="ios-arrow-down"
          />
        )}
        <Text style={styles.drawerLabel}>Administration</Text>
      </View>
    );

    const renderContent = () => (
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => goToUserList()}>
          <View style={styles.accordionItem}>
            <SimpleIcon
              name="people"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => goToInformationList()}>
          <View style={styles.accordionItem}>
            <SimpleIcon
              name="book-open"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>Informasi</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => goToAnnouncementList()}>
          <View style={styles.accordionItem}>
            <SimpleIcon
              name="bell"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>Pengumuman</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => goToPayslipList()}>
          <View style={styles.accordionItem}>
            <SimpleIcon
              name="docs"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>Payslip</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => goToFileList()}>
          <View style={styles.accordionItem}>
            <SimpleIcon
              name="puzzle"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>Files</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    if (role === 'admin') {
      return (
        <Accordion
          dataArray={items}
          animation={true}
          renderHeader={renderHeader}
          renderContent={renderContent}
          style={styles.accordion}
        />
      );
    }
  };

  render() {
    const {photo, name, role, employee_id} = this.props.user;
    //console.log('photo:', photo);
    return (
      <View style={[styles.container]}>
        <View style={styles.userContainer}>
          <UserPanel photo={photo} name={name} nik={employee_id} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.handleItemPress('0')}>
          <View style={styles.drawerItem}>
            <SimpleIcon
              name="speedometer"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>Dashboard</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.handleItemPress(1)}>
          <View style={styles.drawerItem}>
            <SimpleIcon
              name="book-open"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>Informasi</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.handleItemPress(2)}>
          <View style={styles.drawerItem}>
            <SimpleIcon
              name="bell"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>Pengumuman</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSignOut} activeOpacity={0.8}>
          <View style={styles.drawerItem}>
            <SimpleIcon
              name="lock-open"
              size={25}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerLabel}>Sign Out</Text>
          </View>
        </TouchableOpacity>
        {this.renderAdministration(role)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#2f353a',
    flex: 1,
    width: Dimensions.get('window').width * 0.5,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  drawerItemIcon: {
    marginRight: 10,
    color: '#aaa',
  },
  drawerLabel: {
    color: 'white',
  },
  accordion: {borderWidth: 0},
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  userContainer: {
    width: '90%',
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '90%',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(logout()),
    onTabChanged: index => dispatch(cangeTab(index)),
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideDrawer);
