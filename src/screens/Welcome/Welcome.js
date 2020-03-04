import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {goToLogin, startApp} from '../../navigations';

export default class WelcomeScreen extends React.Component {
  async componentDidMount() {
    await AsyncStorage.clear();
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      console.log('token: ', token);
      if (token) {
        startApp();
      } else {
        goToLogin();
      }
    } catch (err) {
      console.log('error: ', err);
      goToLogin();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
