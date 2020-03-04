import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import CardItem from '../UI/CardListItem/CardListItem';

class InformationListWidget extends Component {
  renderItems = () => {
    return this.props.data.map(item => (
      <CardItem
        item={item}
        onPress={() => this.props.onPress(item)}
        key={item.id}
      />
    ));
  };

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Informasi Terkini</Text>
          <Icon name="book-open" size={20} color="white" />
        </View>
        {this.renderItems()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2f353a',
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: 'white',
  },
});

export default InformationListWidget;
