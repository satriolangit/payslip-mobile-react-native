import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content, Item, Input, Icon} from 'native-base';

const SearchBox = props => {
  return (
    <Container>
      <Item>
        <Icon active name="search" />
        <Input
          placeholder="Search"
          onChangeText={text => props.onChangeText(text)}
        />
      </Item>
    </Container>
  );
};

export default SearchBox;
