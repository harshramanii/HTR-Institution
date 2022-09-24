//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { isEmpty } from "lodash";
import CountryPicker from "react-native-country-picker-modal";

import { hp, isIos, statusBarHeight, wp } from "../../helper/constants";
import { colors, fontFamily, fontSize } from "../../helper/utils";
import { ActivityLoader, Button } from "../../components";
import { icons } from "../../helper/iconConstants";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { phoneVerification } from "../../actions/authAction";

var countries = require("country-data").countries;

// create a component
const MobileVerification = ({ navigation, route }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const displayData = route?.params || {};

  console.log("displayData", displayData);

  const [pickerVisible, setPickerVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    cca2: "IN",
    callingCode: "91",
    emoji: "🇮🇳",
  });

  useEffect(() => {
    if (route?.params) {
      setPhoneNumber(route?.params?.contact_no || "");
    }
  }, [route?.params]);

  const onClose = () => setPickerVisible(false);

  const onPressVerificationCode = () => {
    if (isEmpty(phoneNumber)) {
      alert("Please enter number");
    } else if (phoneNumber?.length !== 10) {
      alert("Please enter valid number");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append(
        "phone",
        `+${selectedCountry?.callingCode || "91"}${phoneNumber}`
      );
      const request = {
        data: formData,
        onSuccess: (res) => {
          setIsLoading(false);
          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [
          //       {
          //         name: "VerificationCode",
          //         params: {
          //           data: res,
          //           phone: `+${
          //             selectedCountry?.callingCode || "91"
          //           }${phoneNumber}`,
          //         },
          //       },
          //     ],
          //   })
          // );
          navigate("VerificationCode", {
            data: res,
            phone: `+${selectedCountry?.callingCode || "91"}${
              phoneNumber || ""
            }`,
          });
        },
        onFail: () => {
          setIsLoading(false);
        },
      };
      dispatch(phoneVerification(request));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.verificationText}>{"Mobile Verification "}</Text>
      <View style={styles.borderView} />
      <Text style={styles.enterMobileText}>{"Enter Mobile Number"}</Text>
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity
          onPress={() => setPickerVisible(true)}
          style={styles.phoneInputFlagContainer}
        >
          <Text style={styles.flagText}>{selectedCountry?.emoji || ""}</Text>
          <Image
            source={icons.down}
            resizeMode={"contain"}
            style={styles.downIcon}
          />
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={styles.inputContent}>
          <Text style={styles.countryCodeText}>{`+ ${
            selectedCountry?.callingCode || ""
          }${" "}`}</Text>
          <TextInput
            style={styles.inputContainer}
            keyboardType={"number-pad"}
            placeholder={"0000 - 0000 - 00"}
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>
      <Button
        title={"Send Verification Code"}
        buttonStyle={styles.btnStyle}
        onPress={onPressVerificationCode}
      />
      {pickerVisible && (
        <SafeAreaView>
          <CountryPicker
            countryCode={false}
            withFlag={true}
            withCountryNameButton={false}
            withAlphaFilter={true}
            withCallingCode={true}
            onSelect={(data) => {
              setSelectedCountry({
                cca2: data?.cca2,
                callingCode: data?.callingCode,
                emoji: countries[data?.cca2].emoji,
              });
              setPickerVisible(false);
            }}
            onClose={onClose}
            withFilter={true}
            visible={pickerVisible}
          />
        </SafeAreaView>
      )}
      <ActivityLoader visible={isLoading} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: statusBarHeight,
  },
  borderView: { borderWidth: 1, borderColor: "#EBF0FF", marginTop: hp(3.44) },
  enterMobileText: {
    marginTop: hp(3.89),
    paddingLeft: wp(4.26),
    fontSize: 16,
    fontWeight: "500",
    fontFamily: fontFamily.regular,
  },
  verificationText: {
    marginTop: hp(4),
    fontSize: 16,
    fontWeight: "700",
    paddingLeft: wp(4.26),
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
  },
  phoneInputContainer: {
    borderWidth: 1,
    marginHorizontal: wp(4.26),
    flexDirection: "row",
    borderColor: colors.borderColor,
    borderRadius: wp(1),
    marginTop: hp(4.33),
  },
  btnStyle: {
    marginHorizontal: wp(4.26),
  },
  phoneInputFlagContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1.48),
    paddingHorizontal: wp(4),
    flexDirection: "row",
  },
  flagText: {
    fontSize: fontSize(18),
    fontFamily: fontFamily.medium,
    color: colors.authTitle,
    marginRight: wp(4),
  },
  downIcon: {
    height: wp(1.6),
    width: wp(1.6),
  },
  divider: {
    borderWidth: 0.7,
  },
  inputContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(4),
  },
  countryCodeText: {
    fontSize: fontSize(18),
    fontFamily: fontFamily.medium,
    color: colors.authTitle,
    paddingTop: isIos ? 0 : hp(0.5),
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 0,
    fontSize: fontSize(18),
  },
});

//make this component available to the app
export default MobileVerification;
