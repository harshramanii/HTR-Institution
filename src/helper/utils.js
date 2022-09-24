import {RFValue} from 'react-native-responsive-fontsize';

export const colors = {
  white: '#fff',
  black: '#000',
  red: '#FB7181',
  primary: '#373943',
  borderColor: '#EBF0FF',
  placeholder: '#9098B1',
  textBlue: '#373943',
  authTitle: '#223263',
  grey: '#6A6A6A',
  bg: '#141416',
};

export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

export const fontSize = val => RFValue(val, 812);
