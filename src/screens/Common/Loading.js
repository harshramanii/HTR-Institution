import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';

const Loading = () => {
  const {navigate} = useNavigation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: auth()?.currentUser ? 'HomeTab' : 'SignIn'}],
      }),
    );
  }, []);

  return (
    <View style={style.mainContainer}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
