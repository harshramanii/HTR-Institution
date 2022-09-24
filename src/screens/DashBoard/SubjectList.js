import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {colors, fontSize} from '../../helper/utils';
import {hp, wp} from '../../helper/constants';
import {icons} from '../../helper/iconConstants';
import {useNavigation} from '@react-navigation/native';
import {isExperimentalWebImplementationEnabled} from 'react-native-gesture-handler/lib/typescript/EnableExperimentalWebImplementation';

export default function SubjectList() {
  const {goBack} = useNavigation();

  const onPressBack = () => goBack();

  const data = [
    {id: 1, title: 'Problem Solving using C'},
    {id: 2, title: 'Object Oriented Programming in Java'},
    {id: 3, title: 'Basic Mathematics'},
    {id: 4, title: 'Relational Database Management Systems'},
    {id: 5, title: 'Web design Technoogies'},
    {id: 6, title: 'Basic Computer Concepts'},
  ];

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
        <Text style={style.dashboardText}>Subject List</Text>
      </View>
      <FlatList
        data={data}
        style={{
          marginVertical: hp(4),
        }}
        ItemSeparatorComponent={() => <View style={{height: hp(3)}} />}
        renderItem={({item}) => {
          return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                }}>
                {item?.title || ''}
              </Text>
            </View>
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
});
