import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View {...props} style={[styles.container, props.style]}>
        <View style={styles.iconContainer}>
          <Icon size={30} name="ios-lock" style={styles.icon} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 1,
    padding: 2,
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'flex-start',
  },
  icon: {
    color: 'white',
  },
  titleContainer: {
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
  },
});

export default LoginButton;
