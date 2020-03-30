import React, {Component} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Spinner} from 'native-base';
const Loader = props => {
  const {loading, ...attributes} = props;
  return (
    <Modal visible={loading}>
      <Spinner />
    </Modal>
  );
};
const styles = StyleSheet.create({});
export default Loader;
