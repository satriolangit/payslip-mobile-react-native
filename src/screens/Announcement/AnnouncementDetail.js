import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import ZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

class AnnouncementDetailScreen extends Component {
  state = {
    htmlContent: '',
  };

  renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === 'img') {
      console.log(node.attribs.src);
    }
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{this.props.announcement.title}</Text>
          <Text style={styles.subtitle}>
            {moment(this.props.announcement.created_on).format(
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
              value={this.props.announcement.text}
              stylesheet={htmlStyles}
              renderNode={this.renderNode}
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

export default AnnouncementDetailScreen;
