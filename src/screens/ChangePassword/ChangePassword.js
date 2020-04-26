import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Root,
  Toast,
} from 'native-base';
import {Navigation} from 'react-native-navigation';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import {API_URL, API_JSON_HEADER} from '../../../appSetting';

class ChangePassword extends Component {
  state = {
    isLoading: false,
    errorMessage: null,
    isValidInput: false,
    password: '',
    confirmPassword: '',
  };

  componentDidUpdate() {
    if (!this.state.isValidInput && this.state.errorMessage) {
      Toast.show({
        text: this.state.errorMessage,
        buttonText: 'OK',
        type: 'danger',
        duration: 5000,
        position: 'bottom',
        onClose: () => {
          this.setState({errorMessage: null});
        },
      });
    }
  }

  validateInput = () => {
    const {password, confirmPassword} = this.state;

    if (password.length <= 0) {
      this.setState({
        errorMessage: 'Password tidak boleh kosong.',
        isValidInput: false,
      });
    } else if (confirmPassword !== password) {
      this.setState({
        errorMessage: 'Konfirmasi password tidak sesuai.',
        isValidInput: false,
      });
    } else {
      this.setState({errorMessage: null, isValidInput: true});
    }
  };

  updateUser = async () => {
    const {password, confirmPassword} = this.state;
    const userId = this.props.data;
    const url = API_URL + 'users/changepwd';

    const formData = {
      userId,
      password,
      confirmPassword,
    };

    try {
      const result = await axios.post(url, formData, API_JSON_HEADER);

      //  console.log(result);

      if (result.data.result === 'FAIL') {
        this.setState({isValidInput: false, errorMessage: result.data.message});
        console.log(this.state.errorMessage);
      } else {
        Navigation.pop(this.props.componentId);
      }
    } catch (err) {
      console.log('error: ', err.response);
    }
  };

  handleSave = async () => {
    this.validateInput();

    this.setState({isLoading: true});
    await this.updateUser();
    this.setState({isLoading: false});
  };

  handleCancel = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <Root>
        <Container>
          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <Content>
            <KeyboardAvoidingView>
              <Form>
                <Item stackedLabel>
                  <Label>New Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={text =>
                      this.setState({
                        ...this.state,
                        password: text,
                      })
                    }
                  />
                  <Icon name="md-lock" />
                </Item>
                <Item stackedLabel>
                  <Label>Confirm New Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={text =>
                      this.setState({
                        ...this.state,
                        confirmPassword: text,
                      })
                    }
                  />
                  <Icon name="md-lock" />
                </Item>
                <Button style={[styles.button]} onPress={this.handleSave}>
                  <Text style={{fontSize: 18, color: '#FFF'}}>Save</Text>
                </Button>
                <Button
                  style={[styles.button, styles.buttonCancel]}
                  onPress={this.handleCancel}>
                  <Text style={{fontSize: 18}}>Cancel</Text>
                </Button>
              </Form>
            </KeyboardAvoidingView>
          </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: '#CCC',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ChangePassword;
