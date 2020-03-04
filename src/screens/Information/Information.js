import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';

import {Thumbnail} from 'native-base';
import {Navigation} from 'react-native-navigation';

class InformationScreen extends Component {
  constructor(props) {
    super(props);

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

  detailHandler = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'eslip.InformationDetailScreen',
        passProps: {
          informationId: 0,
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
  };

  render() {
    return (
      <View>
        <Text>InformationScreen</Text>
        <Image
          source={{
            uri:
              'http://1.bp.blogspot.com/-kQuQTyXq0N4/VEOQyyboUvI/AAAAAAAAAm4/WFF40EcSaAQ/s1600/foto-obyek-wisata-candi-prambanan-yogyakarta.jpg',
          }}
          style={styles.image}
        />
        <Thumbnail
          source={{uri: 'http://hrinformationsystem.com:3001/photos/admin.png'}}
        />
        <Image
          style={{width: 50, height: 50, borderWidth: 2, borderColor: 'black'}}
          source={{uri: 'http://hrinformationsystem.com:3001/photos/admin.png'}}
          resizeMode={'cover'} // cover or contain its upto you view look
        />
        <Button title="Detail" onPress={this.detailHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: 200,
  },
});

export default InformationScreen;
