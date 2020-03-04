import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class CardListItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={this.props.onPress}
        activeOpacity={0.7}>
        <View>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.text}>{this.props.item.text}</Text>
          <View style={styles.textMutedContainer}>
            <Icon name="clock" size={10} color="#aaa" />
            <Text style={styles.textMuted}>{this.props.item.created_on}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 20,
    color: '#63c2de',
  },
  text: {
    fontSize: 14,
  },
  textMutedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMuted: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 5,
  },
});

export default CardListItem;
