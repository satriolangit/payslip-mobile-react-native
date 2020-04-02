import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
} from 'react-native';
import {Toast, Root} from 'native-base';

import BackgroundImage from '../../assets/images/login-bg.jpg';
import {connect} from 'react-redux';
import {login, clearAuthError} from '../../store/actions/index';
import {startApp} from '../../navigations';

class LoginScreen extends Component {
  state = {
    nik: '',
    password: '',
  };

  componentDidUpdate() {
    if (this.props.loginResult.error) {
      Toast.show({
        text: this.props.loginResult.error,
        buttonText: 'OK',
        type: 'danger',
        duration: 3000,
        position: 'top',
      });

      this.props.onClearError();
    }

    // console.log(this.props.loginResult);

    // if (
    //   this.props.loginResult.isAuthenticated &&
    //   this.props.loginResult.token !== ''
    // ) {
    //   startApp();
    // }
  }

  loginHandler = () => {
    this.props.onClearError();
    this.props.onLogin(this.state);
  };

  handleInputChange = () => {};

  render() {
    return (
      <Root>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.heading4}>Login</Text>
              <TextInput
                placeholder="Masukkan NIK"
                style={styles.input}
                onChangeText={text => this.setState({nik: text})}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="Masukkan Password"
                style={styles.input}
                onChangeText={text => this.setState({password: text})}
                secureTextEntry={true}
              />
              <View>
                <Button title="Login" onPress={this.loginHandler} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#bbb',
    opacity: 0.8,
  },
  heading4: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 5,
    borderRadius: 4,
  },
});

const mapStateToProps = state => {
  return {
    loginResult: {
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
      error: state.auth.error,
    },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(login(authData)),
    onClearError: () => dispatch(clearAuthError()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
