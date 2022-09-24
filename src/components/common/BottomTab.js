import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Modal from 'react-native-modal';

import {hp, isIos, wp} from '../../helper/constants';
import {icons} from '../../helper/iconConstants';
import {colors, fontSize} from '../../helper/utils';
import {UploadFeedPickerOptions} from '..';

const BottomTab = ({state, navigation}) => {
  const [index, setindex] = useState(0);
  const [visiableUploadModal, setVisiableUploadModal] = useState(false);

  const onPressUpload = () => setVisiableUploadModal(true);
  const onPressCloseUpload = () => setVisiableUploadModal(false);

  useEffect(() => {
    if (state) setindex(state?.index);
  }, [state]);

  const onButtonPress = (id, name) => {
    setindex(id);
    if (name) navigation.navigate(name);
  };

  const RenderImage = ({index, icons, title, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={style.touchableContainer}>
        {index ? (
          <View style={style.titleDisplay}>
            <Text style={style.tabBarText}>{title}</Text>
            <View style={style.dashLine} />
          </View>
        ) : (
          <Image source={icons} style={style.userIcon} resizeMode={'contain'} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.bottomContainer}>
      <RenderImage
        index={index == 0}
        icons={icons.home}
        title={'DashBoard'}
        onPress={() => onButtonPress(0, 'DashBoard')}
      />

      <RenderImage
        index={index === 1}
        icons={icons.user}
        title={'Profile'}
        onPress={() => onButtonPress(1, 'Profile')}
      />
      {/* <UploadFeedPickerOptions
        visiableUploadModal={visiableUploadModal}
        onPressCloseUpload={onPressCloseUpload}
      /> */}
    </View>
  );
};

const style = StyleSheet.create({
  userIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: colors.white,
  },
  tabBarText: {
    color: colors.white,
    fontSize: fontSize(14),
  },
  dashLine: {
    borderWidth: 1,
    width: wp(4),
    borderColor: colors.white,
    marginTop: hp(1),
  },
  titleDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    // justifyContent: "space-around",
    paddingVertical: hp(2),
    alignItems: 'center',
    paddingBottom: isIos ? hp(4) : hp(2),
    backgroundColor: colors.primary,
  },
  touchableContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomTab;
