import {CommonActions} from '@react-navigation/routers';
import {createRef} from 'react';

export const navigationRef = createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
export const goBack = () => navigationRef.current?.goBack();

export const commonActions = (name) =>
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: name}],
    }),
  );
