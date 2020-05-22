import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Radio} from 'native-base';
import moment from 'moment';

const PayslipListItem = props => {
  const {id, filename, month, year, last_download_on} = props.data;

  const lastDownload =
    last_download_on === null
      ? '-'
      : moment(last_download_on).format('DD MMM YYYY, HH:mm:ss');

  const periode = `Periode : ${moment(month, 'MM').format('MMMM')} ${year}`;

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onLongPress={() => props.onLongPress(id)}
      onPress={() => props.onPress(filename)}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{filename}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.textMuted}>{periode}</Text>
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
