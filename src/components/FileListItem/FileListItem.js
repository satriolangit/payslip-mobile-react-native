import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Radio} from 'native-base';
import moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const FileListItem = props => {
  const {filename, created_time} = props.data;
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onLongPress={props.onLongPress}
      onPress={props.onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{filename}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Icon name="clock" size={10} color="#aaa" />
          <Text style={styles.textMuted}>
            Type :{moment(created_time).format('MMMM DD YYYY, HH:mm')}
          </Text>
        </View>
      </View>
      <View style={styles.radioContainer}>
        <Radio onPress={props.onSelected} selected={props.selected} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 2,
    padding: 8,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    color: '#63c2de',
  },
  textMutedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  textMuted: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 5,
  },
});

export default FileListItem;
