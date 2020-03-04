import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

class InformationDetailScreen extends Component {
  state = {
    htmlContent: '<h1>Hello from WebView</h1>',
  };
  render() {
    return (
      <View>
        <Text>Information Detail Screen</Text>
        {/* <WebView
          style={styles.container}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{html: this.state.htmlContent}}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default InformationDetailScreen;
