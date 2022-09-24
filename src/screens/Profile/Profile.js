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
import FastImage from 'react-native-fast-image';

import {useSelector} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/storage';

import {colors, fontFamily, fontSize} from '../../helper/utils';
import {icons} from '../../helper/iconConstants';
import {hp, statusBarHeight, wp} from '../../helper/constants';
import {ActivityLoader} from '../../components';
import moment from 'moment';
import {timeStampToDate} from '../../helper/Global';

const Profile = ({navigation}) => {
  const {navigate} = useNavigation();
  const {userData, allUserData} = useSelector(state => state.data);
  console.log('userData', userData);
  console.log('allUserData', allUserData);

  //console.log("userFeedData", userData?.DOB);

  const [showUploadPicker, setShowUploadPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPressLogOut = () => {
    Alert.alert('Log out', 'Would you like to logout?', [
      {
        text: 'Yes',
        onPress: () => {
          setIsLoading(true);
          auth()
            .signOut()
            .then(() => {
              setIsLoading(false);

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'SignIn'}],
                }),
              );
            })
            .catch(err => {
              setIsLoading(false);
              console.log('error', err);
            });
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  const onPressEdit = () => navigate('EditProfile');
  const onPressStudent = () => navigate('StudentList');

  const onPressUploadImage = () => setShowUploadPicker(true);
  const onPressUploadImageClose = async data => {
    console.log('data', data);
    setShowUploadPicker(false);
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);

    const uploadUri = data?.uri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = firebase.storage().ref(`event/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();

      let userId = await auth().currentUser.uid;
      firestore()
        .collection('User')
        .doc(userId)
        .update({
          ProfilePicture: url,
        })
        .then(() => {
          setIsLoading(false);
          //console.log("Upload SuccessFully");
        })
        .catch(error => {
          setIsLoading(false);
          alert(error);
        });
      // return url;
    } catch (e) {
      setIsLoading(false);
      //console.log(e);
      return null;
    }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.content}>
        <Text style={style.dashboardText}>Profile</Text>

        {/* <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={[style.settingIconComntainer, {left: 0}]}>
          <Image
            source={icons.menu}
            style={style.settingsIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={style.contentContainer}
          onPress={onPressUploadImage}>
          {userData?.ProfilePicture ? (
            <FastImage
              source={{uri: userData?.ProfilePicture}}
              resizeMode={'cover'}
              style={style.profileImage}
            />
          ) : (
            <Image
              source={icons.upload}
              resizeMode={'contain'}
              style={style.uploadIcon}
            />
          )}
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[style.settingIconComntainer, {right: 0}]}
          onPress={onPressEdit}>
          <Image
            source={icons.edit}
            style={style.settingsIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity> */}
        {/* <Text style={style.userName}>{userData?.Name || ''}</Text> */}

        {/* <View style={style.divider} /> */}
        <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Name :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.Name}</Text>
        </View>
        <View style={style.divider} />
        <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Email :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.Email}</Text>
        </View>
        <View style={style.divider} />
        <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Country :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.Country}</Text>
        </View>
        <View style={style.divider} />
        <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Phone :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.ContactNo}</Text>
        </View>
        <View style={style.divider} />
        <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Parent Name :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.ParentName}</Text>
        </View>
        <View style={style.divider} />
        <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Parent Email :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.ParentEmail}</Text>
        </View>
        <View style={style.divider} />
        <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Parent Contact :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.ParentContact}</Text>
        </View>
        <View style={style.divider} />
        {userData?.UserType == 'A' && (
          <TouchableOpacity
            onPress={onPressStudent}
            style={style.normalRowView}>
            <Text style={style.bioTitle}>{'Student List :'}</Text>
            <Text style={style.bioDescTitle}>
              {allUserData?.length || 0}
              {` Student`}
            </Text>
            <Image
              source={icons.right}
              style={{
                width: wp(6),
                height: wp(6),
                tintColor: colors.white,
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        )}
        {/* <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'DOB :'}</Text>
          <Text style={style.bioDescTitle}>
            {userData?.DOB === ''
              ? ''
              : moment(
                  userData?.DOB?.seconds
                    ? timeStampToDate(userData?.DOB?.seconds)
                    : userData?.DOB,
                )?.format('MMMM DD, YYYY')}
          </Text>
        </View> */}
        {/* <View style={style.divider} />
        <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Bio :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.Bio}</Text>
        </View>
        <View style={style.divider} /> */}
        {/* <View style={style.normalRowView}>
          <Text style={style.bioTitle}>{'Location :'}</Text>
          <Text style={style.bioDescTitle}>{userData?.Location}</Text>
        </View>
        <View style={style.divider} /> */}
      </View>
      <TouchableOpacity onPress={onPressLogOut}>
        <Text style={style.logoutText}>{'Logout'}</Text>
      </TouchableOpacity>

      <ActivityLoader visible={isLoading} />
      {/* <UploadPhotoOptions
        visiableUploadModal={showUploadPicker}
        onPressCloseUpload={onPressUploadImageClose}
      /> */}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: statusBarHeight + hp(1),
  },
  uploadIcon: {
    width: wp(10),
    height: wp(10),
    tintColor: colors.primary,
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    // tintColor: colors.primary1,
  },
  userName: {
    fontSize: fontSize(20),
    color: colors.white,
    marginVertical: wp(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: hp(2),
  },
  bioTitle: {
    fontSize: fontSize(20),
    color: colors.white,
    fontWeight: 'bold',
    flex: 0.6,
  },
  bioDescTitle: {
    fontSize: fontSize(20),
    color: colors.white,
    fontWeight: '600',
    flex: 1,
  },
  normalRowView: {
    flexDirection: 'row',
  },
  contentContainer: {
    // padding: wp(4),
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: wp(10),
    marginTop: hp(1),
    alignSelf: 'center',
    height: wp(20),
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    height: wp(6),
    width: wp(6),
    tintColor: colors.white,
  },
  settingIconComntainer: {
    position: 'absolute',
    // right: 0,
  },
  content: {
    flex: 1,
    marginHorizontal: wp(4),
  },
  dashboardText: {
    fontSize: fontSize(19),
    color: colors.white,
    fontWeight: '600',
    marginBottom: hp(4),
  },
  logoutText: {
    fontSize: fontSize(20),
    color: colors.red,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginBottom: hp(4),
  },
});

export default Profile;
