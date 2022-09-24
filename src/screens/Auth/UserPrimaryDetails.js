//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  AppState,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

import {isEmpty} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';

import {verifyEmail} from '../../helper/Global';
import {icons} from '../../helper/iconConstants';
import {colors, fontFamily} from '../../helper/utils';
import {getCountryData} from '../../actions/dataAction';
import {customerSubmitForm} from '../../actions/authAction';
import CountryModal from '../../components/common/CountryModal';
import {hp, statusBarHeight, wp} from '../../helper/constants';
import DocumentsModal from '../../components/common/DocumentsModal';
import {ActivityLoader, Button, InputText} from '../../components';

// create a component
const UserPrimaryDetails = ({navigation, route}) => {
  const dispatch = useDispatch();

  console.log('route', route);

  const {navigate} = useNavigation();

  const {countryData} = useSelector(state => state.data);

  const [countryView, setCountryView] = useState(false);
  const [comapanyProductDetails, setCompanyProductDetails] = useState(false);
  const [text, setText] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [coVisitorName, setCoVisitorName] = useState('');
  const [coVisitorContact, setCoVisitorContact] = useState('');
  const [coVisitorEmail, setCoVisitorEmail] = useState('');
  const [companyBroucher, setCompanyBroucher] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactWhatsApp, setContactWhatsApp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  console.log('companyBroucher', companyBroucher);

  const [warnCompanyName, setWarnCompanyName] = useState('');
  const [warnName, setWarnName] = useState('');
  const [warnEmail, setWarnEmail] = useState('');
  const [warnPhone, setWarnPhone] = useState('');
  const [warnCountry, setWarnCountry] = useState('');
  const [warnCoVisitorContact, setWarnCoVisitorContact] = useState('');
  const [warnCoVisitorEmail, setWarnCoVisitorEmail] = useState('');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('nextAppState', nextAppState);
      if (nextAppState !== 'active') {
        AsyncStorage.setItem('USERCUSTOMERINFO', 'null');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

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

    const getUserInfoData = async () => {
      const userInfo = await AsyncStorage.getItem('USERCUSTOMERINFO');

      let displayData = JSON.parse(userInfo);

      if (!isEmpty(displayData)) {
        setEmail(displayData?.email || '');
        setPhone(displayData?.contact_no || '');
        setName(displayData?.name || '');
        setText(displayData?.country || '');
      }

      console.log('userInfo', JSON.parse(userInfo));
    };
    getUserInfoData();
  }, []);

  const onPressCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setCompanyProductDetails(false);
      setCompanyBroucher(image);
    });
  };

  const onPressGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setCompanyProductDetails(false);
      setCompanyBroucher(image);
      console.log(image);
    });
  };

  const onPressDocuments = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });
    setCompanyProductDetails(false);

    console.log('res', res);
    setCompanyBroucher(res?.[0]);
  };

  const onPressSubmit = async () => {
    if (isEmpty(name)) {
      // Alert.alert("Please enter the name");
      setWarnName('Please enter the name');
    } else if (isEmpty(email)) {
      // Alert.alert("Please enter the email");
      setWarnEmail('Please enter the email');
    } else if (!verifyEmail(email)) {
      setWarnEmail('Please enter the valid email address');
      // Alert.alert("Please enter the valid email address");
    } else if (isEmpty(phone)) {
      setWarnPhone('Please enter the phone');
      // Alert.alert("Please enter the phone");
    } else if (isEmpty(text)) {
      setWarnCountry('Please enter the country');
      // Alert.alert("Please enter the country");
    } else if (!isEmpty(coVisitorContact) && coVisitorContact?.length != 10) {
      setWarnCoVisitorContact('Please enter the valid Parent Contact');
      // Alert.alert("Please enter the valid Co Visitor Contact");
    } else if (!isEmpty(coVisitorEmail) && !verifyEmail(coVisitorEmail)) {
      setWarnCoVisitorEmail('Please enter the valid Parent email');
      // Alert.alert("Please enter the valid Co Visitor email");
    } else {
      setIsLoading(true);
      const loginInfo = await AsyncStorage.getItem('LOGININFO');

      console.log('loginInfo', JSON.parse(loginInfo));
      console.log('route?.uid', route?.uid);

      firestore()
        .collection('User')
        .doc(route?.uid)
        .update({
          Id: route?.uid || '',
          ParentName: coVisitorName || '',
          ParentContact: coVisitorContact,
          ParentEmail: coVisitorEmail,
        })
        .then(async res => {
          console.log('res', res);
          setIsLoading(false);

          const loginData = await AsyncStorage.getItem('LOGIN_EMAIL_PASS');
          console.log('loginData', JSON.parse(loginData));

          auth()
            .signInWithEmailAndPassword(
              JSON.parse(loginData)?.email,
              JSON.parse(loginData)?.password,
            )
            .then(() => {
              setIsLoading(false);
              const data = {
                email: JSON.parse(loginData)?.email,
                password: JSON.parse(loginData)?.password,
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

          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [{name: 'HomeTab'}],
          //   }),
          // );
        })
        .catch(error => {
          console.log('error', error);
          setIsLoading(false);

          alert(error);
        });
    }
  };

  const clearState = () => {
    setWarnCompanyName('');
    setWarnName('');
    setWarnEmail('');
    setWarnPhone('');
    setWarnCountry('');
    setWarnCoVisitorContact('');
    setWarnCoVisitorEmail('');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{flex: 0}}>
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <SafeAreaView>
            <Text style={styles.verificationText}>{'Registration Form '}</Text>
            <View style={styles.borderView} />
            <Text style={styles.enterMobileText}>{'Primary Details'}</Text>

            <View style={{paddingHorizontal: wp(4.26)}}>
              <InputText
                placeholder={'Name*'}
                value={name}
                onChangeText={text => {
                  setName(text);
                  clearState();
                }}
                emailWarnText={warnName}
                onBlur={() => {
                  if (isEmpty(name)) {
                    setWarnName('Please enter the name');
                  }
                }}
              />
              <InputText
                placeholder={'Email*'}
                value={email}
                editable={false}
                keyboardType={'email-address'}
                onChangeText={text => {
                  setEmail(text);
                  clearState();
                }}
                emailWarnText={warnEmail}
                onBlur={() => {
                  if (isEmpty(email)) {
                    setWarnEmail('Please enter the email');
                  } else if (!verifyEmail(email)) {
                    setWarnEmail('Please enter the valid email');
                  }
                }}
              />
              <InputText
                placeholder={'Contact No.*'}
                value={phone}
                keyboardType={'number-pad'}
                maxLength={10}
                onChangeText={text => {
                  clearState();
                  setPhone(text);
                }}
                onBlur={() => {
                  if (isEmpty(phone)) {
                    setWarnPhone('Please enter the Contact Number');
                  }
                }}
                emailWarnText={warnPhone}
              />
              {/* <InputText
                editable={false}
                placeholder={"Country"}
                source={icons.downArrow}
                value={text}
                onPressIn={() => {
                  setCountryView(!countryView);
                }}
              /> */}

              <InputText
                editable={false}
                placeholder="Country*"
                source={icons.downArrow}
                value={text}
                onPressIn={() => {
                  setIsVisible(!isVisible);
                }}
                onBlur={() => {
                  if (isEmpty(text)) {
                    setWarnCountry('Please enter the Country');
                  }
                }}
                emailWarnText={warnCountry}
              />
              {isVisible && (
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
              )}

              <InputText
                placeholder={'Parent Name'}
                value={coVisitorName}
                onChangeText={text => {
                  setCoVisitorName(text);
                  clearState();
                }}
              />
              <InputText
                placeholder={'Parent Contact'}
                value={coVisitorContact}
                keyboardType={'number-pad'}
                maxLength={10}
                onChangeText={text => {
                  setCoVisitorContact(text);
                  clearState();
                }}
                onBlur={() => {
                  if (
                    !isEmpty(coVisitorContact) &&
                    coVisitorContact?.length != 10
                  ) {
                    setWarnCoVisitorContact(
                      'Please enter the valid Parent Contact',
                    );
                  }
                }}
                emailWarnText={warnCoVisitorContact}
              />
              <InputText
                placeholder={'Parent Email'}
                value={coVisitorEmail}
                onChangeText={text => {
                  setCoVisitorEmail(text);
                  clearState();
                }}
                onBlur={() => {
                  if (
                    !isEmpty(coVisitorEmail) &&
                    !verifyEmail(coVisitorEmail)
                  ) {
                    setWarnCoVisitorEmail(
                      'Please enter the valid Parent Email',
                    );
                  }
                }}
                emailWarnText={warnCoVisitorEmail}
              />
            </View>
            <View style={styles.companyDetailContainer}>
              {/* <Text style={styles.productDetailText}>{"Comapny Details"}</Text> */}
              <InputText
                editable={false}
                placeholder={
                  isEmpty(companyBroucher)
                    ? 'Adhar card(PDF)'
                    : companyBroucher?.filename ||
                      companyBroucher?.name ||
                      `${companyBroucher?.modificationDate || ''}.${
                        companyBroucher?.mime?.split('/')?.[1] || ''
                      }`
                }
                source={icons.attach}
                onRightButtonPress={() => {
                  setCompanyProductDetails(!comapanyProductDetails);
                }}
                onPressIn={() =>
                  setCompanyProductDetails(!comapanyProductDetails)
                }
                rightButtonStyle={{height: hp(3), width: wp(3.97)}}
              />
              {/* <Text style={styles.productDetailText}>{"Product Details"}</Text>
              <InputText
                editable={false}
                placeholder={"Products catalog"}
                onPressIn={() =>
                  setCompanyProductDetails(!comapanyProductDetails)
                }
                source={icons.attach}
                rightButtonStyle={{ height: hp(3.97), width: wp(3.97) }}
              />
              <InputText
                editable={false}
                placeholder={"Product Video"}
                onPressIn={() =>
                  setCompanyProductDetails(!comapanyProductDetails)
                }
                source={icons.attach}
                rightButtonStyle={{ height: hp(3.97), width: wp(3.97) }}
              />
              <InputText
                placeholder={"Product Description"}
                multiline={true}
                inputView={{ paddingBottom: hp(14) }}
              /> */}
              {/* <Text style={styles.contactDetailsText}>{"Contact Details"}</Text>
              <InputText
                placeholder={"Contact No"}
                value={contactNumber}
                keyboardType={"number-pad"}
                maxLength={10}
                onChangeText={setContactNumber}
              />
              <InputText
                placeholder={"Email"}
                value={contactEmail}
                keyboardType={"email-address"}
                onChangeText={setContactEmail}
              />
              <InputText
                placeholder={"Whatsapp"}
                value={contactWhatsApp}
                keyboardType={"number-pad"}
                maxLength={10}
                onChangeText={setContactWhatsApp}
              /> */}
              <Button title={'Submit'} onPress={onPressSubmit} />
            </View>
            <DocumentsModal
              isVisible={comapanyProductDetails}
              onPressCamera={onPressCamera}
              onPressGallery={onPressGallery}
              onPressDocuments={onPressDocuments}
              onBackdropPress={() => {
                setCompanyProductDetails(false);
              }}
            />
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActivityLoader visible={isLoading} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: statusBarHeight,
  },
  borderView: {
    borderWidth: 1,
    borderColor: '#EBF0FF',
    marginTop: hp(3.44),
  },
  enterMobileText: {
    marginTop: hp(3.89),
    paddingLeft: wp(4.26),
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
  },
  verificationText: {
    marginTop: hp(4),
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: wp(4.26),
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
  },
  countryModalContainer: {
    backgroundColor: 'White',
    height: hp(23.5),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
  },
  companyDetailContainer: {
    paddingHorizontal: wp(4.26),
    // paddingTop: hp(2.09),
    paddingBottom: hp(2),
  },
  productDetailText: {
    fontSize: 14,
    fontWeight: '700',
    paddingTop: hp(2.09),
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
  },
  contactDetailsText: {
    fontSize: 14,
    fontWeight: '700',
    paddingTop: hp(2.09),
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
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
export default UserPrimaryDetails;
