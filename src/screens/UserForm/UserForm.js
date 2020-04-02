/* eslint-disable react-native/no-inline-styles */
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
  Radio,
  Button,
  Icon,
  Root,
  Toast,
} from 'native-base';
import {Navigation} from 'react-native-navigation';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  API_URL,
  API_JSON_HEADER,
  API_MULTIPART_HEADER,
} from '../../../appSetting';

export default class UserForm extends Component {
  state = {
    isLoading: false,
    errorMessage: null,
    isValidInput: false,
    user: {
      user_id: '',
      name: '',
      email: '',
      password: '',
      passwordPlain: '',
      confirmPassword: '',
      employee_id: '',
      photo: '',
      role: 'employee',
      phone: '',
      is_active: 1,
    },
  };

  componentWillMount() {
    if (this.props.mode === 'edit') {
      this.setState({user: {...this.state.user, ...this.props.data}});
    }
  }

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

  handleCancel = () => {
    Navigation.pop(this.props.componentId);
  };

  validateInput = () => {
    const {
      name,
      email,
      employee_id,
      password,
      confirmPassword,
      phone,
    } = this.state.user;

    if (name.length <= 0) {
      this.setState({
        errorMessage: 'Nama tidak boleh kosong.',
        isValidInput: false,
      });
    } else if (email.length <= 0) {
      this.setState({
        errorMessage: 'Email tidak boleh kosong.',
        isValidInput: false,
      });
    } else if (employee_id.length <= 0) {
      this.setState({
        errorMessage: 'NIK tidak boleh kosong.',
        isValidInput: false,
      });
    } else if (this.props.mode === 'add' && password.length <= 0) {
      this.setState({
        errorMessage: 'Password tidak boleh kosong.',
        isValidInput: false,
      });
    } else if (confirmPassword !== password && this.props.mode === 'add') {
      this.setState({
        errorMessage: 'Konfirmasi password tidak sesuai.',
        isValidInput: false,
      });
    } else if (phone.length <= 0) {
      this.setState({errorMessage: 'No. telepon tidak boleh kosong.'});
    } else {
      this.setState({errorMessage: null, isValidInput: true});
    }
  };

  createUser = async () => {
    const {
      email,
      name,
      employee_id,
      role,
      is_active,
      password,
      confirmPassword,
      phone,
      photo,
    } = this.state.user;

    const user = {
      email,
      name,
      employeeId: employee_id,
      role,
      isActive: is_active,
      password,
      phone,
      confirmPassword,
    };

    try {
      let formData = new FormData();
      //formData.append('photo', photoFile);
      formData.append('data', JSON.stringify(user));

      const url = API_URL + 'users/add';
      const result = await axios.post(url, formData, API_MULTIPART_HEADER);

      //  console.log(result);

      if (result.data.result === 'FAIL') {
        this.setState({isValidInput: false, errorMessage: result.data.message});
        console.log(this.state.errorMessage);
      } else {
        Navigation.pop(this.props.componentId);
      }
    } catch (err) {
      console.log(err.response);
      //const errorResponse = err.response.data.errors.join();
      //setErrorMessage(errorResponse);
    }
  };

  updateUser = async () => {
    const {
      email,
      name,
      employee_id,
      role,
      is_active,
      phone,
      user_id,
      photo,
    } = this.state.user;

    const user = {
      email,
      name,
      employeeId: employee_id,
      role,
      isActive: is_active,
      userId: user_id,
      phone,
      photo,
    };

    try {
      const url = API_URL + 'users/update';
      let formData = new FormData();
      //formData.append("photo", photoFile);
      formData.append('data', JSON.stringify(user));

      const result = await axios.post(url, formData, API_MULTIPART_HEADER);

      //  console.log(result);

      if (result.data.result === 'FAIL') {
        this.setState({isValidInput: false, errorMessage: result.data.message});
        console.log(this.state.errorMessage);
      } else {
        Navigation.pop(this.props.componentId);
      }
    } catch (err) {
      console.log('error: ', err.response);
      //const errorResponse = err.response.data.errors.join();
      //setErrorMessage(errorResponse);
    }
  };

  handleSave = async () => {
    this.validateInput();

    if (this.props.mode === 'add') {
      this.setState({isLoading: true});
      await this.createUser();
      this.setState({isLoading: false});
    } else {
      this.setState({isLoading: true});
      await this.updateUser();
      this.setState({isLoading: false});
    }
  };

  renderPasswordInput = () => (
    <View>
      <Item stackedLabel>
        <Label>Password</Label>
        <Input
          secureTextEntry
          onChangeText={text =>
            this.setState({user: {...this.state.user, password: text}})
          }
        />
        <Icon name="md-lock" />
      </Item>
      <Item stackedLabel>
        <Label>Confirm Password</Label>
        <Input
          secureTextEntry
          onChangeText={text =>
            this.setState({user: {...this.state.user, confirmPassword: text}})
          }
        />
        <Icon name="md-lock" />
      </Item>
    </View>
  );

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
                  <Label>Nama</Label>
                  <Input
                    defaultValue={this.state.user.name}
                    onChangeText={text =>
                      this.setState({user: {...this.state.user, name: text}})
                    }
                  />
                  <Icon active name="md-person" />
                </Item>
                <Item stackedLabel>
                  <Label>Email</Label>
                  <Input
                    defaultValue={this.state.user.email}
                    onChangeText={text =>
                      this.setState({user: {...this.state.user, email: text}})
                    }
                  />
                  <Icon active name="md-mail" />
                </Item>
                <Item stackedLabel>
                  <Label>NIK</Label>
                  <Input
                    defaultValue={this.state.user.employee_id}
                    onChangeText={text =>
                      this.setState({
                        user: {...this.state.user, employee_id: text},
                      })
                    }
                  />
                  <Icon active name="md-create" />
                </Item>
                {this.props.mode === 'add' && this.renderPasswordInput()}
                <Item stackedLabel>
                  <Label>No. Telp</Label>
                  <Input
                    defaultValue={this.state.user.phone}
                    onChangeText={text =>
                      this.setState({user: {...this.state.user, phone: text}})
                    }
                  />
                  <Icon active name="md-call" />
                </Item>

                <Item inlineLabel>
                  <Radio
                    selected={this.state.user.role === 'employee'}
                    onPress={() =>
                      this.setState({
                        user: {...this.state.user, role: 'employee'},
                      })
                    }
                    style={{margin: 5}}
                  />
                  <Label style={{margin: 5}}>Employee</Label>
                  <Radio
                    selected={this.state.user.role === 'admin'}
                    onPress={() =>
                      this.setState({user: {...this.state.user, role: 'admin'}})
                    }
                    style={{margin: 5}}
                  />
                  <Label style={{margin: 5}}>Administrator</Label>
                </Item>
                <Item inlineLabel>
                  <Radio
                    selected={this.state.user.is_active === 1 ? true : false}
                    onPress={() =>
                      this.setState({
                        user: {
                          ...this.state.user,
                          is_active: this.state.user.is_active === 1 ? 0 : 1,
                        },
                      })
                    }
                    style={{margin: 5}}
                  />
                  <Label style={{margin: 5}}>Active ?</Label>
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
