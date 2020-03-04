import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';

class AnnouncementDetailScreen extends Component {
  state = {
    htmlContent:
      '<a href="/pages/information/ca0cceb7-9403-420b-abbe-b6153bcfa079"><h3>Tips Sehat di Musim Hujan</h3></a><p style="text-align: left;"><span style="font-family: georgia;"><strong>Cuaca akhir-akhir ini yang tidak menentu menjadi penyebab berbagai macam virus seperti flu,,, berikut ini tips sederhana meringankan atau mencegah flu.</strong></span></p><p></p><img src="http://hrinformationsystem.com:3001/files/whatsapp_image_2020-01-08_at_07.48.19.jpeg" alt="undefined" style="float: none; height: auto; width: 100%;"><p></p><p></p><div><span class="badge badge-success">Posted January 08 2020, 08:21:05</span></div><hr>',
  };

  render() {
    return (
      <WebView
        style={styles.container}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{html: this.state.htmlContent}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default AnnouncementDetailScreen;
