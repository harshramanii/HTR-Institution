import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React from 'react';
import {colors, fontSize} from '../../helper/utils';
import {hp, wp} from '../../helper/constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {icons} from '../../helper/iconConstants';
import {ActivityLoader, Button, InputText} from '../../components';
import {useState} from 'react';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {flashMsg} from '../../helper/Global';
import {isEmpty} from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function EditStudentDetails({navigation, route}) {
  console.log('route', route);

  const currentStudentData = route?.params?.data;

  console.log('currentStudentData', currentStudentData);

  const {goBack, navigate} = useNavigation();
  const {userData, allUserData} = useSelector(state => state.data);

  const [sName, setSName] = useState('');
  const [sContactNo, setSContactNo] = useState('');
  const [sCountry, setSCountry] = useState('');
  const [sAtten, setSAtten] = useState('');
  const [totalSAtten, setTotalSAtten] = useState('');
  const [sTasks, setSTasks] = useState('');
  const [sTotalTasks, setTotalSTasks] = useState('');
  const [notes, setNotes] = useState('');
  const [upcomingDate, setUpcomingDate] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (!isEmpty(currentStudentData)) {
      setSName(currentStudentData?.Name || '');
      setSContactNo(currentStudentData?.ContactNo || '');
      setSCountry(currentStudentData?.Country || '');
      setSAtten(currentStudentData?.SAtten || '');
      setTotalSAtten(currentStudentData?.TotalSAtten || '');
      setSTasks(currentStudentData?.STasks || '');
      setTotalSTasks(currentStudentData?.STotalTasks || '');
      // setUpcomingDate(currentStudentData?.UpcomingDate || '');
      setParentContact(currentStudentData?.ParentContact || '');
      setParentEmail(currentStudentData?.ParentEmail || '');
      setParentName(currentStudentData?.ParentName || '');
      setNotes(currentStudentData?.Notes || '');
    }
  }, [currentStudentData]);

  const onPressBack = () => goBack();
  const onPressSave = () => {
    if (isEmpty(sName)) {
      Alert.alert('Please enter the student name');
    } else if (isEmpty(sContactNo)) {
      Alert.alert('Please enter the student Contact');
    } else if (sContactNo?.length != 10) {
      Alert.alert('Please enter the valid student Contact');
    } else if (isEmpty(sCountry)) {
      Alert.alert('Please enter the student country');
    } else if (isEmpty(sAtten)) {
      Alert.alert('Please enter the student Attendance');
    } else if (isEmpty(totalSAtten)) {
      Alert.alert('Please enter the total days of student Attendance');
    } else if (isEmpty(sTasks)) {
      Alert.alert('Please enter the student completed tasks');
    } else if (isEmpty(sTotalTasks)) {
      Alert.alert('Please enter the total tasks of student tasks');
    } else if (isEmpty(parentName)) {
      Alert.alert('Please enter the parent name');
    } else if (isEmpty(parentEmail)) {
      Alert.alert('Please enter the parent email');
    } else if (isEmpty(parentContact)) {
      Alert.alert('Please enter the parent contact');
    } else {
      firestore()
        .collection('User')
        .doc(currentStudentData?.Id)
        .update({
          ContactNo: sContactNo,
          Country: sCountry,
          Email: currentStudentData?.Email,
          Name: sName,
          ParentContact: parentContact,
          ParentEmail: parentEmail,
          ParentName: parentName,
          SAtten: sAtten,
          TotalSAtten: totalSAtten,
          STasks: sTasks,
          STotalTasks: sTotalTasks,
          UpcomingDate: upcomingDate,
          Notes: notes,
        })
        .then(res => {
          console.log('res', res);
          setIsLoading(false);
          goBack();
          flashMsg('Student Profile', 'Student profile update successfully');
        })
        .catch(error => {
          console.log('error', error);
          setIsLoading(false);
          alert(error);
        });
    }
  };

  const onPressUpcomingExam = () => setIsOpenModal(true);

  const onChangeDate = date => {
    setUpcomingDate(date);
    setIsOpenModal(false);
  };

  const onCloseDatePicker = () => setIsOpenModal(false);
  return (
    <View style={style.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{flex: 0}}>
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <SafeAreaView />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={onPressBack}
              style={{marginRight: wp(2)}}>
              <Image
                source={icons.left}
                style={{height: wp(6), width: wp(6), tintColor: colors.white}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Text style={style.dashboardText}>Student Details</Text>
          </View>

          <View style={{marginVertical: hp(2)}}>
            <InputText
              icons={icons.email}
              placeholder={'Email'}
              keyboardType={'email-address'}
              editable={false}
              value={currentStudentData?.Email || ''}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Name'}
              value={sName || ''}
              onChangeText={setSName}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Contact number'}
              value={sContactNo || ''}
              keyboardType={'phone-pad'}
              onChangeText={setSContactNo}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Country'}
              value={sCountry || ''}
              onChangeText={setSCountry}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Parent Contact'}
              value={parentContact || ''}
              keyboardType={'phone-pad'}
              onChangeText={setParentContact}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Parent Email'}
              value={parentEmail || ''}
              keyboardType={'email-address'}
              onChangeText={setParentEmail}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Parent Name'}
              value={parentName || ''}
              onChangeText={setParentName}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Attendance'}
              value={sAtten || ''}
              keyboardType={'phone-pad'}
              onChangeText={setSAtten}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Total Attendance'}
              value={totalSAtten || ''}
              keyboardType={'phone-pad'}
              onChangeText={setTotalSAtten}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Tasks'}
              value={sTasks || ''}
              keyboardType={'phone-pad'}
              onChangeText={setSTasks}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Total Tasks'}
              value={sTotalTasks || ''}
              keyboardType={'phone-pad'}
              onChangeText={setTotalSTasks}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Notes'}
              value={notes || ''}
              onChangeText={setNotes}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
            <InputText
              placeholder={'Upcoming Exam Date'}
              value={moment(upcomingDate)?.format('DD-MM-YYYY') || ''}
              onChangeText={setUpcomingDate}
              editable={false}
              onPressIn={onPressUpcomingExam}
              // emailWarnText={emailWarnText}
              // onChangeText={onChangeEmail}
            />
          </View>
          <Button title={'Save'} onPress={onPressSave} />
        </ScrollView>
      </KeyboardAvoidingView>
      <DateTimePicker
        mode={'date'}
        isVisible={isOpenModal}
        onConfirm={onChangeDate}
        onCancel={onCloseDatePicker}
        minimumDate={new Date()}
      />
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
  divider: {
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: hp(2),
  },
});
