import React, {Component} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImagePicker from 'react-native-image-picker';

export default class InformationForm extends Component {
  handleSave = async () => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.getContentHtml();
    // console.log(html);
    alert(html);
  };

  handlePressAddImage = () => {
    // insert URL
    this.richText.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
    );
    // insert base64
    // this.richText.insertImage(`data:${image.mime};base64,${image.data}`);
    this.richText.blurContentEditor();
  };

  launchImagePicker = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri,
        // });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri,
        // });
      }
    });
  };

  handleCancel = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    const initHTML = `<br/>
      <center><b>Pell.js Rich Editor</b></center>
      <center>React Native</center>
      <br/>
      
      `;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
          <Button title={'Cancel'} onPress={this.handleCancel} />
          <Button title="Save" onPress={this.handleSave} />
        </View>
        <ScrollView style={styles.scroll}>
          <RichEditor
            ref={rf => (this.richText = rf)}
            initialContentHTML={initHTML}
            style={styles.rich}
          />
        </ScrollView>
        <KeyboardAvoidingView behavior={'padding'}>
          <RichToolbar
            style={styles.richBar}
            getEditor={() => this.richText}
            iconTint={'#000033'}
            selectedIconTint={'#2095F2'}
            selectedButtonStyle={{backgroundColor: 'transparent'}}
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
    paddingTop: 10,
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
});
