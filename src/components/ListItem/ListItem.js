import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';

const ListItem = props => {
  return (
    <TouchableHighlight onPress={props.onItemPressed}>
      <View style={styles.listItem}>
        <Image
          resizeMode="contain"
          source={props.placeImage}
          style={styles.placeImage}
        />
        <Text>{props.placeName}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#cecece',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeImage: {
    marginRight: 8,
    width: 30,
    height: 30,
  },
});

export default ListItem;
