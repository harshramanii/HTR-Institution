//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {colors} from '../../helper/utils';
import {hp, statusBarHeight, wp} from '../../helper/constants';
import {Button} from '../../components';

// create a component
const EmailVerification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.verificationText}>{'Email Verification '}</Text>
      <View style={styles.borderView} />
      <Text style={styles.enterMobileText}>{'Verify Your Email Address '}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.firstLineText}>
          {'An email has Been sent to Your email address  '}
        </Text>
        <Text style={styles.emailText}>{'jhon.newman@gmail.com'}</Text>
        <Text style={styles.thirdLine}>
          {'Please click on that link to verify your email address'}
        </Text>
        <Button
          buttonStyle={{marginTop: hp(8.5)}}
          title={'Verify Email'}
          onPress={() => {
            navigation.navigate('SuccessVerification');
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.notRecieveText}>{"Didn't receive email?"}</Text>
          <Text style={styles.resendText}>{' Resend'}</Text>
        </View>
      </View>
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
  enterMobileText: {
    marginTop: hp(3.89),
    paddingLeft: wp(4.26),
    fontSize: 16,
    fontWeight: '500',
  },
  verificationText: {
    marginTop: hp(4),
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: wp(4.26),
  },
  textContainer: {paddingHorizontal: wp(4.26), paddingTop: hp(1.38)},
  firstLineText: {color: colors.placeholder, fontSize: 12, fontWeight: '500'},
  emailText: {
    color: '#223263',
    paddingTop: hp(0.5),
    fontSize: 12,
    fontWeight: '500',
  },
  thirdLine: {
    color: colors.placeholder,
    fontSize: 12,
    fontWeight: '500',
    paddingTop: hp(0.5),
  },
  notRecieveText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.placeholder,
  },
  resendText: {fontSize: 12, fontWeight: '800', color: colors.black},
});

//make this component available to the app
export default EmailVerification;
