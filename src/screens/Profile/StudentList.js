import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {colors, fontSize} from '../../helper/utils';
import {hp, wp} from '../../helper/constants';
import {icons} from '../../helper/iconConstants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function StudentList() {
  const {goBack, navigate} = useNavigation();
  const {userData, allUserData} = useSelector(state => state.data);

  const onPressBack = () => goBack();

  const ListFooterComponent = () => {
    return (
      <View>
        <View style={style.divider} />
        <TouchableOpacity
          onPress={() => navigate('Register')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={icons.plus}
            style={{
              width: wp(6),
              height: wp(6),
              tintColor: colors.white,
              marginRight: wp(2),
            }}
            resizeMode={'contain'}
          />

          <Text
            style={{
              fontSize: fontSize(18),
              color: colors.white,
              fontWeight: '600',
              flex: 1,
            }}>
            {'Add Student' || ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={style.mainContainer}>
      <SafeAreaView />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onPressBack} style={{marginRight: wp(2)}}>
          <Image
            source={icons.left}
            style={{height: wp(6), width: wp(6), tintColor: colors.white}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <Text style={style.dashboardText}>Student List</Text>
      </View>
      <FlatList
        data={allUserData}
        style={{
          marginVertical: hp(4),
        }}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={() => <View style={style.divider} />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigate('EditStudentDetails', {data: item})}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: fontSize(18),
                  color: colors.white,
                  fontWeight: '600',
                  marginRight: wp(2),
                }}>
                {'\u2B22'}
              </Text>
              <Text
                style={{
                  fontSize: fontSize(18),
                  color: colors.white,
                  fontWeight: '600',
                  flex: 1,
                }}>
                {item?.Name || ''}
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
          );
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.bg,
    flex: 1,
    padding: wp(4),
  },
  dashboardText: {
    fontSize: fontSize(19),
    color: colors.white,
    fontWeight: '600',
  },
  divider: {
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: hp(2),
  },
});
