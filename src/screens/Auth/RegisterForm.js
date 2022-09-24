//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import {isEmpty} from 'lodash';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {hp, statusBarHeight, wp} from '../../helper/constants';
import {colors, fontSize} from '../../helper/utils';
import {InputText, Button, ActivityLoader} from '../../components';
import {icons} from '../../helper/iconConstants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fontFamily} from '../../helper/utils';
import Modal from 'react-native-modal';
import CountryModal from '../../components/common/CountryModal';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCountryData} from '../../actions/dataAction';
import {flashMsg, verifyEmail, verifyPassword} from '../../helper/Global';
import AsyncStorage from '@react-native-community/async-storage';
import {signUpAccount} from '../../actions/authAction';

// create a component
const RegisterForm = ({navigation}) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cmpPassword, setCmpPassword] = useState('');
  const [searchText, setSearchText] = useState('');

  const {countryData} = useSelector(state => state.data);

  const onPresssignIn = () => {
    navigate('Register');
  };

  const onPressSignUp = () => {
    if (isEmpty(name)) {
      Alert.alert('Please enter the name');
    } else if (isEmpty(email)) {
      Alert.alert('Please enter the email');
    } else if (isEmpty(phone)) {
      Alert.alert('Please enter the phone');
    } else if (isEmpty(text)) {
      Alert.alert('Please choose the country');
    } else if (isEmpty(password)) {
      Alert.alert('Please enter the password');
    } else if (isEmpty(cmpPassword)) {
      Alert.alert('Please enter the verify password');
    } else if (phone?.length != 10) {
      Alert.alert('Please enter valid contact number');
    } else if (!verifyEmail(email)) {
      Alert.alert('Please enter valid email address');
    } else if (password?.length <= 8) {
      Alert.alert('Please enter valid password');
    } else if (!verifyPassword(password)) {
      Alert.alert('Please enter valid password');
    } else if (password?.toString() != cmpPassword?.toString()) {
      Alert.alert('Your password mismatch!');
    } else {
      const data = {
        name: name,
        email: email,
        contact_no: phone,
        country: text,
      };

      AsyncStorage.setItem('USERCUSTOMERINFO', JSON.stringify(data));
      AsyncStorage.setItem('USERINFO', JSON.stringify(data));

      setIsLoading(true);

      auth()
        .createUserWithEmailAndPassword(email || '', password || '')
        .then(response => {
          console.log('response response response', response);
          const uid = response.user.uid;
          console.log('response response uid', uid);

          setIsLoading(false);

          firestore()
            .collection('User')
            .doc(uid)
            .set({
              Id: uid,
              Name: name || '',
              Email: email,
              Password: password,
              ContactNo: phone,
              Country: text,
            })
            .then(() => {
              setIsLoading(false);

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'RegistraionForm', uid: uid}],
                }),
              );
              console.log('Sign in with firebase successful!');
            })
            .catch(error => {
              console.log('error', error);
              setIsLoading(false);

              flashMsg('SIGN UP', 'Something went to wrong!');
            });

          //console.log("Succes Fiull response:---");

          // navigate("HomeTab");
        })
        .catch(error => {
          //console.log("error", error);
        });
    }
  };

  useEffect(() => {
    const getCountry = () => {
      const request = {
        data: {},
        onSuccess: res => {},
        onFail: () => {},
      };
      dispatch(getCountryData(request));
    };
    getCountry();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          nestedScrollEnabled>
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <Text style={styles.headerStyle}>{"Let's Get Started"}</Text>
            <Text style={styles.subHeaderStyle}>{'Create an new account'}</Text>
            <View style={{marginTop: hp(7.98)}}>
              <InputText
                icons={icons.user}
                placeholder={'Name*'}
                value={name}
                onChangeText={setName}
              />
              <InputText
                icons={icons.email}
                placeholder={'Your Email*'}
                value={email}
                keyboardType={'email-address'}
                onChangeText={setEmail}
              />
              <InputText
                icons={icons.phone}
                placeholder={'Contact No.*'}
                value={phone}
                maxLength={10}
                keyboardType={'number-pad'}
                onChangeText={setPhone}
              />
              <InputText
                editable={false}
                placeholder="Country*"
                source={icons.downArrow}
                value={text}
                onPressIn={() => {
                  setIsVisible(!isVisible);
                }}
              />
              {isVisible ? (
                <View style={styles.modalContainer}>
                  <TextInput
                    style={{
                      paddingHorizontal: wp(4),
                      paddingVertical: hp(1.5),
                      color: colors.black,
                    }}
                    value={searchText}
                    placeholder={'Search your country...'}
                    onChangeText={setSearchText}
                  />
                  <View style={{borderWidth: 1, borderColor: 'lightgrey'}} />
                  <FlatList
                    data={countryData?.filter(e =>
                      e?.toLowerCase()?.includes(searchText.toLowerCase()),
                    )}
                    nestedScrollEnabled
                    ListEmptyComponent={() => (
                      <Text
                        style={{
                          marginTop: hp(2),
                          color: colors.black,
                          textAlign: 'center',
                        }}>
                        {'No Country Found'}
                      </Text>
                    )}
                    renderItem={({item}) => {
                      return (
                        <CountryModal
                          text={item}
                          onPress={() => {
                            setIsVisible(false);
                            setText(item);
                          }}
                        />
                      );
                    }}
                  />
                </View>
              ) : (
                <>
                  <InputText
                    icons={icons.lock}
                    placeholder={'Password*'}
                    passEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    maxLength={16}
                    rightIcon={icons}
                  />
                  <Text
                    style={{
                      fontSize: fontSize(12),
                      marginHorizontal: wp(2),
                      marginTop: hp(1),
                      color: colors.grey,
                    }}>
                    {
                      'The password must be 6 to 12 characters long. The password must contain a mix of letters, numbers, and/or special characters.'
                    }
                  </Text>
                  <InputText
                    icons={icons.lock}
                    placeholder={'Verify Password*'}
                    passEntry={true}
                    value={cmpPassword}
                    onChangeText={setCmpPassword}
                    maxLength={16}
                    rightIcon={icons}
                  />
                </>
              )}

              <Button
                title={'Sign Up'}
                buttonStyle={{marginVertical: hp(1)}}
                onPress={onPressSignUp}
              />
              <Text style={[styles.signInText, styles.haveAccount]}>
                {' have a account? '}
                <Text style={styles.signInText} onPress={onPresssignIn}>
                  {'Sign In'}
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
    paddingTop: statusBarHeight,
  },
  headerStyle: {
    marginTop: hp(13.19),
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
  },
  subHeaderStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: colors.placeholder,
    fontSize: 15,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textBlue,
    fontFamily: fontFamily.bold,
  },
  haveAccount: {
    color: colors.placeholder,
    fontFamily: fontFamily.regular,
    marginVertical: hp(1),
  },
  modalContainer: {
    backgroundColor: 'White',
    height: hp(24.3),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
  },
});

//make this component available to the app
export default RegisterForm;
