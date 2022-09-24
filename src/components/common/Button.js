//import liraries
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {hp, wp} from '../../helper/constants';
import {colors, fontFamily, fontSize} from '../../helper/utils';

// create a component
const Button = ({title, onPress, buttonStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, buttonStyle]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.97),
    backgroundColor: colors.primary,
    borderRadius: wp(10),
    marginVertical: hp(3.2),
  },
  buttonText: {
    fontSize: fontSize(15),
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
});

//make this component available to the app
export default Button;
