import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Radio} from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';

const InformationListItem = props => {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onLongPress={() => props.onLongPress(props.data)}
      onPress={() => props.onPress(props.data)}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.data.title}</Text>
        </View>
        <View style={styles.textMutedContainer}>
          <Icon name="clock" size={10} color="#aaa" />
          <Text style={styles.textMuted}>
            {moment(props.data.created_on).format('MMMM DD YYYY, HH:mm:ss')}
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

export default InformationListItem;
