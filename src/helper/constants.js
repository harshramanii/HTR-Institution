import { Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const wp = (val) => widthPercentageToDP(val);

export const hp = (val) => heightPercentageToDP(val);

export const isIos = Platform.OS === "ios";

export const statusBarHeight = getStatusBarHeight() + hp(1);
