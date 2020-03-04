import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import {addPlace} from '../../store/actions/index';

class SharePlaceScreen extends Component {
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

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Share a place with us!</Text>
          <View style={styles.placeholder}>
            <Text>Image preview !</Text>
          </View>
          <Button title="Pick Image" />
          <View style={styles.placeholder}>
            <Text>Map</Text>
          </View>
          <Button title="Locate me" />
          <TextInput placeholder="Place Name" />
          <Button title="Share the place" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(addPlace(placeName)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(null, mapDispatchToProps)(SharePlaceScreen);
