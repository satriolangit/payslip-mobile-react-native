import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Radio} from 'native-base';
import moment from 'moment';

const PayslipListItem = props => {
  const lastDownload =
    props.data.last_download_on === null
      ? '-'
      : moment(props.data.last_download_on).format('DD MMM YYYY, HH:mm:ss');

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onLongPress={() => props.onLongPress(props.data.id)}
      onPress={() => props.onPress(props.data.filename)}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.data.filename}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.textMuted}>
            Periode :{' '}
            {moment()
              .month(props.data.month)
              .format('MMMM')}{' '}
            {props.data.year}
          </Text>
          <Text style={styles.textMuted}>
            Downloads :{props.data.download_count}
          </Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.textMuted}>last download : {lastDownload}</Text>
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

export default PayslipListItem;
