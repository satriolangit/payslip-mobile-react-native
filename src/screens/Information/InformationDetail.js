import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';

class InformationDetailScreen extends Component {
  state = {
    htmlContent: '',
  };

  handleImagePress = src => {
    console.log(Navigation);

    Navigation.push(this.props.componentId, {
      component: {
        name: 'eslip.ZoomImage',
        passProps: {
          imgSrc: src,
        },
        options: {
          topBar: {
            title: {
              text: 'Image',
            },
          },
        },
      },
    });
  };

  renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === 'img') {
      console.log(node.attribs.src);
      const imgSrc = node.attribs.src;
      return (
        <TouchableOpacity onLongPress={() => this.handleImagePress(imgSrc)}>
          <Image source={{uri: imgSrc}} style={styles.image} />
        </TouchableOpacity>
      );
    }
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

        <View style={styles.htmlContainer}>
          <HTMLView
            value={this.props.information.text}
            stylesheet={htmlStyles}
            renderNode={this.renderNode}
          />
        </View>
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
    width: '100%',
    height: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    margin: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default InformationDetailScreen;
