/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  return (
    <WebView
      source={{uri: 'http://www.hrinformationsystem.com'}}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});

export default App;
