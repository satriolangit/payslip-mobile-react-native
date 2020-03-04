import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class AnouncementWidget extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.7}>
        <View style={styles.widget}>
          <View style={styles.iconContainer}>
            <Icon name="bell" size={15} color="white" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>Announcement Today</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  widget: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    backgroundColor: '#63c2de',
    borderRadius: 3,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
  },
});

export default AnouncementWidget;
