import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const PayslipListItem = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => props.onLongPress(props.payslipId)}>
      <View style={styles.centerContent}>
        <CheckBox onPress={props.onPress} checked={props.checked} />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.wrapText}>{props.filename}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text>{props.employeeName}</Text>
          <Text>{props.nik}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text>Periode : {props.periode}</Text>
          <Text>Downloads :{props.periode}</Text>
        </View>
      </View>
      <View style={styles.centerContent}>
        <Icon
          name="trash"
          size={30}
          onPress={() => props.onPress(props.payslipId)}
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
    justifyContent: 'center',
  },
  wrapText: {
    flexShrink: 1,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PayslipListItem;
