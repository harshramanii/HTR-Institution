//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from '../../components';
import {hp, statusBarHeight, wp} from '../../helper/constants';
import {colors} from '../../helper/utils';

// create a component
const SuccessVerification = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.verificationText}>{'Email Verification '}</Text>
      <View style={styles.borderView} />
      <View style={styles.textContainer} />
      <Text style={styles.successFullText}>
        {'Email Verification successfull'}
      </Text>
      <Button buttonStyle={styles.btnStyle} title={'Next'} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,

    backgroundColor: colors.white,
  },
  borderView: {borderWidth: 1, borderColor: '#EBF0FF', marginTop: hp(3.44)},

  verificationText: {
    marginTop: hp(4),
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: wp(4.26),
  },
  textContainer: {
    marginVertical: hp(7.25),

    height: wp(77.33),
    width: wp(77.33),
    marginHorizontal: wp(11.33),
  },
  successFullText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#223263',
  },
  btnStyle: {marginHorizontal: wp(4.5)},
});

//make this component available to the app
export default SuccessVerification;
