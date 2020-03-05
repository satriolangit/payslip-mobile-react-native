import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';

import BackgroundImage from '../../assets/images/login-bg.jpg';
import {connect} from 'react-redux';
import {login, clearAuthError} from '../../store/actions/index';

class LoginScreen extends Component {
  state = {
    nik: '999',
    password: '123456',
  };

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate:', prevProps);
    // if (this.props.error) {
    //   //Alert.alert('error', this.props.error);
    //   //this.props.onClearError();
    //   console.log('error login');
    // }
  }

  loginHandler = () => {
    this.props.onClearError();
    this.props.onLogin(this.state);
    //console.log(this.props.token);
  };

  handleInputChange = () => {};

  render() {
    return (
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
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
    opacity: 0.8,
    borderWidth: 2,
    borderColor: '#bbb',
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
  },
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
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
