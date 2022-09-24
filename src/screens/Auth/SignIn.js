//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {InputText, Button, ActivityLoader} from '../../components';
import {hp, wp} from '../../helper/constants';
import {icons} from '../../helper/iconConstants';
import {verifyEmail} from '../../helper/Global';
import {colors, fontFamily, fontSize} from '../../helper/utils';
import {emailPasswordVerification} from '../../actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';

// create a component
const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailWarnText, setEmailWarnText] = useState('');
  const [passwordWarnText, setPasswordWarnText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = text => {
    setEmailWarnText('');
    setPasswordWarnText('');
    setEmail(text);
  };
  const onChangePassword = text => {
    setEmailWarnText('');
    setPasswordWarnText('');
    setPassword(text);
  };

  const onPressSignIn = () => {
    if (isEmpty(email)) {
      setEmailWarnText('Please enter your email');
    } else if (!verifyEmail(email)) {
      setEmailWarnText('Please enter your valid email');
    } else if (isEmpty(password)) {
      setPasswordWarnText('Please enter your password');
    } else {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('res', res);
          setIsLoading(false);
          const data = {
            email: email,
            password: password,
          };
          AsyncStorage.setItem('LOGIN_EMAIL_PASS', JSON.stringify(data));

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'HomeTab'}],
            }),
          );
        })
        .catch(error => {
          setIsLoading(false);
          Alert.alert('Email Address or password is incorrect.');
        });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.headerTitleText}>{'Sign In to continue'}</Text>
      <View style={{marginTop: hp(10.55)}}>
        <InputText
          icons={icons.email}
          placeholder={'Your Email'}
          value={email}
          keyboardType={'email-address'}
          emailWarnText={emailWarnText}
          onChangeText={onChangeEmail}
        />
        <InputText
          icons={icons.password}
          placeholder={'Password'}
          passEntry={true}
          value={password}
          emailWarnText={passwordWarnText}
          onChangeText={onChangePassword}
          rightIcon={icons}
        />
        <Button title={'Sign In'} onPress={onPressSignIn} />
        {/* <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>{"OR"}</Text>
          <View style={styles.divider} />
        </View> */}
        {/* <TouchableOpacity style={styles.googleSignInContainer}>
          <Image
            source={icons.google}
            style={styles.googleIcon}
            resizeMode={"contain"}
          />
          <Text style={styles.loginWithText}>{"Login with Google"}</Text>
        </TouchableOpacity> */}
        {/* <Text style={[styles.forgotText, { marginTop: hp(2) }]}>
          {"Forgot Password?"}
        </Text> */}
        {/* <Text style={[styles.forgotText, styles.dontAccount]}>
          {'Don’t have a account? '}
          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate('Register')}>
            {'Register'}
          </Text>
        </Text> */}
      </View>
      <ActivityLoader visible={isLoading} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(4.26),
  },
  headerTitleText: {
    textAlign: 'center',
    fontSize: fontSize(24),
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
    marginTop: hp(10.15),
  },
  divider: {
    flex: 1,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: colors.borderColor,
  },
  orText: {
    marginHorizontal: wp(6.13),
    fontSize: fontSize(14),
    fontFamily: fontFamily.bold,
    color: colors.placeholder,
  },
  orContainer: {
    flexDirection: 'row',
  },
  googleSignInContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: hp(1.72),
    paddingHorizontal: wp(4.84),
    borderRadius: wp(1.33),
    borderColor: colors.borderColor,
    marginVertical: hp(2.65),
  },
  googleIcon: {
    height: wp(5.33),
    width: wp(5.33),
  },
  loginWithText: {
    flex: 1,
    textAlign: 'center',
    marginLeft: wp(3.38),
    fontSize: fontSize(14),
    color: colors.placeholder,
    fontFamily: fontFamily.bold,
  },
  forgotText: {
    textAlign: 'center',
    fontSize: fontSize(14),
    color: colors.textBlue,
    fontFamily: fontFamily.bold,
  },
  dontAccount: {
    color: colors.placeholder,
    fontFamily: fontFamily.regular,
    marginVertical: hp(1),
  },
});

//make this component available to the app
export default SignIn;
