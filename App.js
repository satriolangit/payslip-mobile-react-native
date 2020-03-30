import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {goToLogin, startApp} from './src/navigations';

class App extends React.Component {
  async componentDidMount() {
    try {
      await AsyncStorage.clear();
      const token = await AsyncStorage.getItem('TOKEN');
      //console.log('token: ', token);
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
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
