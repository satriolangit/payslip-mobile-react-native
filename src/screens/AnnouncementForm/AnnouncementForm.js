import React, {Component} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  TextInput,
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Loader from 'react-native-loading-spinner-overlay';
import {Navigation} from 'react-native-navigation';

import {
  API_MULTIPART_HEADER,
  API_URL,
  API_JSON_HEADER,
} from '../../../appSetting';

import {showDangerToast} from '../../helper';

class AnnouncementForm extends Component {
  state = {
    isLoading: false,
    title: '',
    text: '<p></p>',
    id: null,
  };

  componentWillMount() {
    if (this.props.data !== null) {
      const {title, text, id} = this.props.data;
      this.setState({title: title, text: text, id: id});
    }
  }

  create = async () => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.getContentHtml();
    //console.log(html);

    const formData = {
      title: this.state.title,
      text: html,
    };

    try {
      this.setState({isLoading: true});
      const url = API_URL + 'announcement';
      await axios.post(url, formData, API_JSON_HEADER);
      this.setState({isLoading: false});
      Navigation.pop(this.props.componentId);
    } catch (err) {
      showDangerToast('Create pengumuan gagal.');
      console.log(err);
    }
  };

  update = async () => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.getContentHtml();
    //console.log(html);

    const formData = {
      title: this.state.title,
      text: html,
      id: this.state.id,
    };

    try {
      this.setState({isLoading: true});
      const url = API_URL + 'announcement/update';
      await axios.post(url, formData, API_JSON_HEADER);
      this.setState({isLoading: false});
      Navigation.pop(this.props.componentId);
    } catch (err) {
      showDangerToast('Update pengumuan gagal.');
      console.log(err);
    }
  };

  handleSave = async () => {
    if (this.props.data !== null) {
      await this.update();
    } else {
      await this.create();
    }
  };

  handleCancel = () => {
    Navigation.pop(this.props.componentId);
  };

  createFormData = (photo, body = null) => {
    const data = new FormData();

    data.append('file', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    if (body !== null) {
      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });
    }

    return data;
  };

  launchImagePicker = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const url = API_URL + 'upload';
        const formData = this.createFormData(response);
        try {
          this.setState({isLoading: true});
          const res = await axios.post(url, formData, API_MULTIPART_HEADER);
          const imageUrl = res.data.imageUrl;
          //console.log('imageUrl', imageUrl);
          this.richText.insertImage(imageUrl);
          this.richText.blurContentEditor();

          this.setState({isLoading: false});
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Loader
          visible={this.state.isLoading}
          textContent={'Loading...'}
          // eslint-disable-next-line react-native/no-inline-styles
          textStyle={{color: '#FFF'}}
        />
        <View style={styles.nav}>
          <Button color="#aaa" title={'Cancel'} onPress={this.handleCancel} />
          <Button title="Save" onPress={this.handleSave} />
        </View>
        <View>
          <TextInput
            placeholder="Judul Pengumuman"
            onChangeText={text => this.setState({title: text})}
            style={styles.inputText}
            defaultValue={this.state.title}
          />
        </View>
        <ScrollView style={styles.scroll}>
          <RichEditor
            ref={rf => (this.richText = rf)}
            initialContentHTML={this.state.text}
            style={styles.rich}
          />
        </ScrollView>
        <KeyboardAvoidingView behavior={'bottom'}>
          <RichToolbar
            style={styles.richBar}
            getEditor={() => this.richText}
            iconTint={'#000033'}
            selectedIconTint={'#2095F2'}
            selectedButtonStyle={styles.transparent}
            onPressAddImage={this.launchImagePicker}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 5,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  inputText: {borderBottomColor: '#ccc', borderBottomWidth: 1},
  loader: {justifyContent: 'center'},
  transparent: {backgroundColor: 'transparent'},
});

export default AnnouncementForm;
