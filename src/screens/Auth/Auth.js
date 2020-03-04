import React, {Component} from 'react';
import {View, Button, StyleSheet, ImageBackground} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import LoginBackground from '../../asset/images/LoginBackground.jpg';
import ButtonWithBackground from '../../components/UI/Buttons/ButtonWithBackground';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <ImageBackground source={LoginBackground} style={styles.imageBackground}>
        <View style={styles.container}>
          <MainText>
            <HeadingText style={styles.headingText}>Please Log In</HeadingText>
          </MainText>
          <ButtonWithBackground color="#29aaf4" onPress={() => alert('Hello')}>
            Switch to Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your E-Mail Address"
              style={styles.input}
            />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#eee',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  headingText: {
    color: '#eee',
  },
});

export default AuthScreen;
