import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//--- Common
import Loading from '../screens/Common/Loading';
import SignIn from '../screens/Auth/SignIn';
import RegisterForm from '../screens/Auth/RegisterForm';
import MobileVerification from '../screens/Auth/MobileVerification';
import VerificationCode from '../screens/Auth/VerificationCode';
import SelectionUser from '../screens/Auth/SelectionUser';
import UserPrimaryDetails from '../screens/Auth/UserPrimaryDetails';
import EmailVerification from '../screens/Auth/EmailVerification';
import SuccessVerification from '../screens/Auth/SuccessVerification.js';
import CustomerHome from '../screens/Auth/CustomerHome';
import VendorScreen from '../screens/Auth/VendorScreen';
import JobScreen from '../screens/Auth/JobScreen';
import ForAdvertisement from '../screens/Auth/ForAdvertisement';
import OtherForm from '../screens/Auth/OtherForm';
import ViewWeb from '../screens/Common/ViewWeb';
import TabNavigation from './TabNavigation';
import SubjectList from '../screens/DashBoard/SubjectList';
import StudentList from '../screens/Profile/StudentList';
import EditStudentDetails from '../screens/Profile/EditStudentDetails';

//---- Main Stack
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Loading'} component={Loading} />
        <Stack.Screen name={'SignIn'} component={SignIn} />
        <Stack.Screen name={'Register'} component={RegisterForm} />
        <Stack.Screen name={'MobileVerify'} component={MobileVerification} />
        <Stack.Screen name={'VerificationCode'} component={VerificationCode} />
        <Stack.Screen name={'RegistraionForm'} component={UserPrimaryDetails} />
        <Stack.Screen name={'UserSelection'} component={SelectionUser} />
        <Stack.Screen name={'CustomerHome'} component={CustomerHome} />
        <Stack.Screen name={'VendorScreen'} component={VendorScreen} />
        <Stack.Screen name={'ForJob'} component={JobScreen} />
        <Stack.Screen name={'Advertisement'} component={ForAdvertisement} />
        <Stack.Screen name={'OtherForm'} component={OtherForm} />
        <Stack.Screen name={'ViewWeb'} component={ViewWeb} />
        <Stack.Screen name={'HomeTab'} component={TabNavigation} />
        <Stack.Screen name={'SubjectList'} component={SubjectList} />
        <Stack.Screen name={'StudentList'} component={StudentList} />
        <Stack.Screen
          name={'EditStudentDetails'}
          component={EditStudentDetails}
        />

        <Stack.Screen
          name={'EmailVerification'}
          component={EmailVerification}
        />
        <Stack.Screen
          name={'SuccessVerification'}
          component={SuccessVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
