import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const PayslipListItem = props => {
  const {filename, type, size, onRemoveItem, style} = props;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{filename}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.textMuted}>Type :{type}</Text>
          <Text style={styles.textMuted}>Size :{size}</Text>
        </View>
      </View>
      <View style={styles.radioContainer}>
        <Icon name="md-trash" size={30} onPress={onRemoveItem} />
      </View>
    </View>
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
