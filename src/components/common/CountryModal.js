//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

// create a component
const CountryModal = ({text, onPress, selectedStyle}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.btnText, selectedStyle]}>
        <Text style={styles.textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {paddingTop: hp(0.98)},
  btnText: {
    paddingTop: hp(0.6),
    paddingLeft: wp(4.26),
  },
  textStyle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: colors.placeholder,
  },
});

//make this component available to the app
export default CountryModal;
