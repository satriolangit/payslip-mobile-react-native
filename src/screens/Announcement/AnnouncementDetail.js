import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import HTML from 'react-native-render-html';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';

class AnnouncementDetailScreen extends Component {
  state = {
    htmlContent: '',
  };

  handleImagePress = src => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'eslip.ZoomImage',
        passProps: {
          imgSrc: src,
        },
        options: {
          topBar: {
            title: {
              text: src,
            },
          },
        },
      },
    });
  };

  renderHtml = () => {
    const IMAGES_MAX_WIDTH = Dimensions.get('window').width;
    const CUSTOM_STYLES = {
      p: {
        margin: 10,
        fontSize: 16,
        color: '#555',
      },
    };

    const CUSTOM_RENDERERS = {
      img: htmlAttribs => {
        console.log('htmlAttribut:', htmlAttribs);
        return (
          <TouchableOpacity
            onLongPress={() => this.handleImagePress(htmlAttribs.src)}>
            <Image source={{uri: htmlAttribs.src}} style={styles.image} />
          </TouchableOpacity>
        );
      },
    };
    const DEFAULT_PROPS = {
      htmlStyles: CUSTOM_STYLES,
      renderers: CUSTOM_RENDERERS,
      imagesMaxWidth: IMAGES_MAX_WIDTH,
      onLinkPress: (evt, href) => {
        Linking.openURL(href);
      },
      debug: true,
    };

    return <HTML {...DEFAULT_PROPS} html={this.props.announcement.text} />;
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
        <View style={styles.htmlContainer}>{this.renderHtml()}</View>
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
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
});

export default AnnouncementDetailScreen;
