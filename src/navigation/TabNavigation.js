import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Profile
import DashBoard from '../screens/DashBoard/DashBoard';
import Profile from '../screens/Profile/Profile';

import {wp} from '../helper/constants';
import {colors, fontSize} from '../helper/utils';
import {BottomTab} from '../components';

//---- Main Stack
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashBoard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: style.tabBarsStyle,
      }}
      tabBar={props => <BottomTab {...props} />}>
      <Tab.Screen name={'DashBoard'} component={DashBoard} />
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  userIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: colors.primary,
  },
  tabBarText: {
    color: colors.white,
    fontSize: fontSize(14),
  },
  tabBarsStyle: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
  },
});

export default TabNavigation;
