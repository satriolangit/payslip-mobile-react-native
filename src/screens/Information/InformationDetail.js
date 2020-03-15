import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import ZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import HTML from 'react-native-render-html';

class InformationDetailScreen extends Component {
  state = {
    htmlContent: '',
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{this.props.information.title}</Text>
          <Text style={styles.subtitle}>
            {moment(this.props.information.created_on).format(
              'MMMM DD YYYY, HH:mm:ss',
            )}
          </Text>
        </View>

        <ZoomableView
          maxZoom={3}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}>
          <View style={styles.htmlContainer}>
            <HTMLView
              value={this.props.information.text}
              stylesheet={htmlStyles}
            />
          </View>
        </ZoomableView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {justifyContent: 'flex-start'},
  headingContainer: {
    padding: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    color: '#63c2de',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  htmlContainer: {},
});

const htmlStyles = StyleSheet.create({
  p: {
    margin: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default InformationDetailScreen;
