import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';

import {logout} from '../../store/actions/index';
import UserPanel from '../../components/SideBarUserPanel/UserPanel';

class SideDrawer extends Component {
  handleSignOut = () => {
    this.props.onSignOut();
  };
  render() {
    const {photo, name, role, employee_id} = this.props.user;
    return (
      <View style={[styles.container]}>
        <View style={styles.userContainer}>
          <UserPanel photo={photo} name={name} nik={employee_id} />
        </View>
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity onPress={this.handleSignOut}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
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
  },
  drawerLabel: {
    color: 'white',
  },
  userContainer: {
    width: '90%',
    height: 150,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(logout()),
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
