import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const AnnouncementListItem = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => props.onLongPress(props.data)}>
      <View style={styles.centerContent}>
        <CheckBox onPress={props.onPress} checked={props.checked} />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.wrapText}>{props.data.title}</Text>
        </View>
        <View>
          <Text>{props.data.subtitle}</Text>
        </View>
      </View>
      <View style={styles.centerContent}>
        <Icon
          name="trash"
          size={30}
          onPress={() => props.onPress(props.data.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  wrapText: {
    flexShrink: 1,
  },
});

export default AnnouncementListItem;
