import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Logo from '../../../assets/images/logo_payslip.png';

const TopBar = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} resizeMode="center" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#bbb',
  },
  title: {
    fontSize: 18,
  },
});

export default TopBar;
