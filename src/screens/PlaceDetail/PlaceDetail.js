import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import {deletePlace} from '../../store/actions/index';

class PlaceDetail extends Component {
  placeDeleteHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          <Image
            source={this.props.selectedPlace.image}
            style={styles.placeImage}
          />
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeleteHandler}>
            <View style={styles.deleteIcon}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
  },
  placeImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  deleteIcon: {
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(null, mapDispatchToProps)(PlaceDetail);
