import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Radio} from 'native-base';

const PayslipListItem = props => {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onLongPress={() => props.onLongPress(props.data.id)}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.data.filename}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.textMuted}>Periode : {props.data.month}</Text>
          <Text style={styles.textMuted}>Downloads :{props.data.year}</Text>
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

export default PayslipListItem;
