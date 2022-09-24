import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {isEmpty} from 'lodash';
import {hp, statusBarHeight, wp} from '../../helper/constants';
import {icons} from '../../helper/iconConstants';

import {colors, fontSize} from '../../helper/utils';
import {useEffect} from 'react';
import {getStudentData, getUserData} from '../../actions/dataAction';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ActivityLoader} from '../../components';
import {timeStampToDate} from '../../helper/Global';
import moment from 'moment';

export default function DashBoard() {
  const {userData, allUserData} = useSelector(state => state.data);

  console.log('allUserData', allUserData);

  console.log('userData', userData);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  let sum = 0;
  allUserData?.map(item => {
    sum += Number(item?.SAtten);
  });

  console.log('sum,sum', sum);

  useEffect(() => {
    setIsLoading(true);
    const Getuser = async () => {
      setIsLoading(true);
      const request = {
        onSuccess: () => setIsLoading(false),
      };
      dispatch(getUserData(request));
    };
    const GetStudent = async () => {
      setIsLoading(true);
      const request = {
        onSuccess: () => setIsLoading(false),
      };
      dispatch(getStudentData(request));
    };
    setIsLoading(false);
    Getuser();
    GetStudent();
  }, []);

  let time = timeStampToDate(userData?.UpcomingDate) || new Date();

  console.log('userData?.UpcomingDate', userData?.UpcomingDate);
  const onPressSubjectList = () => navigate('SubjectList');
  return (
    <View style={style.mainContainer}>
      <SafeAreaView />
      <Text style={style.dashboardText}>DashBoard</Text>
      {userData?.UserType === 'A' ? null : (
        <View
          style={{
            marginTop: wp(6),
            marginBottom: hp(2),
            backgroundColor: colors.primary,
            borderTopStartRadius: wp(4),
            borderTopEndRadius: wp(4),
            padding: wp(4),
          }}>
          <Text style={{fontSize: fontSize(18), color: colors.white}}>
            {'Attendance Status'}
          </Text>
          <Text
            style={{
              fontSize: fontSize(16),
              color: colors.white,
              marginVertical: hp(1),
            }}>
            {isEmpty(userData?.SAtten)
              ? '00.00'
              : parseFloat(
                  (Number(userData?.SAtten || 0) /
                    Number(userData?.TotalSAtten || 0)) *
                    100,
                )?.toFixed(2) || 0}
            {' %'}
          </Text>
        </View>
      )}
      {userData?.UserType === 'A' ? (
        <View
          style={{
            marginTop: wp(6),
            backgroundColor: colors.primary,
            borderTopStartRadius: wp(4),
            borderTopEndRadius: wp(4),
            padding: wp(4),
            borderTopStartRadius: wp(userData?.UserType !== 'A' ? 0 : 4),
            borderTopEndRadius: wp(userData?.UserType !== 'A' ? 0 : 4),
          }}>
          <Text style={{fontSize: fontSize(18), color: colors.white}}>
            {'Attendance Status'}
          </Text>
          <Text
            style={{
              fontSize: fontSize(16),
              color: colors.white,
              marginVertical: hp(1),
            }}>
            {parseFloat(
              (Number(sum || 0) / Number(allUserData?.length * 30 || 0)) * 100,
            )?.toFixed(2) || 0}
            {' %'}
          </Text>
        </View>
      ) : null}
      {userData?.UserType === 'A' ? null : (
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.primary,
              padding: wp(4),
              marginRight: wp(2),
            }}>
            <Text
              style={{fontSize: wp(5), color: colors.white, fontWeight: '500'}}>
              {'Left Tasks'}
            </Text>
            <Text
              style={{
                fontSize: wp(5),
                color: colors.white,
                fontWeight: 'bold',
              }}>
              {isEmpty(userData?.STasks) ? 0 : userData?.STasks}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.primary,
              padding: wp(4),
              marginLeft: wp(2),
            }}>
            <Text
              style={{fontSize: wp(5), color: colors.white, fontWeight: '500'}}>
              {'Total Tasks'}
            </Text>
            <Text
              style={{
                fontSize: wp(5),
                color: colors.white,
                fontWeight: 'bold',
              }}>
              {isEmpty(userData?.STotalTasks) ? 0 : userData?.STotalTasks}
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          backgroundColor: colors.primary,
          padding: wp(4),
          marginVertical: hp(2),
        }}>
        <Text style={{fontSize: wp(5), color: colors.white, fontWeight: '500'}}>
          {'Upcoming Exam Date'}
        </Text>
        <Text
          style={{fontSize: wp(5), color: colors.white, fontWeight: 'bold'}}>
          {moment(time)?.format('DD-MM-YYYY') || '-'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPressSubjectList}
        style={{
          backgroundColor: colors.primary,
          padding: wp(4),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: wp(5), color: colors.white, fontWeight: '500'}}>
          {'Subject List'}
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
      <View
        onPress={onPressSubjectList}
        style={{
          backgroundColor: colors.primary,
          padding: wp(4),
          marginVertical: hp(2),
          borderBottomLeftRadius: wp(4),
          borderBottomRightRadius: wp(4),
        }}>
        <Text style={{fontSize: wp(5), color: colors.white, fontWeight: '500'}}>
          {'Notes'}
        </Text>
        <Text style={{fontSize: wp(5), color: colors.white, fontWeight: '300'}}>
          {isEmpty(userData?.Notes) ? 'Not notes' : userData?.Notes}
        </Text>
      </View>
      <ActivityLoader visible={isLoading} />
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
