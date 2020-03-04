import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const DefaultInput = props => {
  return (
    <TextInput
      underlineColorAndroid="transparent"
      {...props}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    margin: 5,
  },
});

export default DefaultInput;
