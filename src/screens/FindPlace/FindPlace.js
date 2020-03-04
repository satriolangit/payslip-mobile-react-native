import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
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

  itemSelectedHandler = key => {
    const currentPlace = this.props.places.find(place => {
      return place.key === key;
    });

    Navigation.push(this.props.componentId, {
      component: {
        name: 'practical.PlaceDetailScreen',
        passProps: {
          selectedPlace: currentPlace,
        },
        options: {
          topBar: {
            title: {
              text: currentPlace.name,
            },
          },
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceList
          places={this.props.places}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
