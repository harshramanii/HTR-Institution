//import liraries
import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { isEmpty } from "lodash";
import { colors, fontFamily } from "../../helper/utils";
import { hp, statusBarHeight, wp } from "../../helper/constants";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { ActivityLoader, Button } from "../../components";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { otpVerification } from "../../actions/authAction";

// create a component
const VerificationCode = ({ navigation, route }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");

  console.log("route", route);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const onPressContinue = () => {
    if (isEmpty(otp)) {
      alert("Please enter otp");
    } else if (otp?.length !== 6) {
      alert("Please enter valid otp");
    } else if (otp?.toString() != route?.params?.data?.otp?.toString()) {
      alert("Please enter valid otp");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("phone", route?.params?.phone?.toString());
      formData.append("otp", otp?.toString());
      const request = {
        data: formData,
        onSuccess: res => {
          setIsLoading(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "RegistraionForm" }],
            })
          );
        },
        onFail: () => {
          setIsLoading(false);
        },
      };
      dispatch(otpVerification(request));
    }
  };

  const onPressSkip = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "RegistraionForm" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.verificationText}>{"Verification "}</Text>
      <View style={styles.borderView} />
      <Text style={styles.enterMobileText}>{"Verify your mobile number"}</Text>
      <Text style={styles.numberText}>{`Enter OTP sent to ${
        route?.params?.phone || ""
      }`}</Text>
      <OTPInputView
        pinCount={6}
        autoFocusOnLoad
        // onCodeChanged={onOtpVerifyChange}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        style={styles.otpInputContainer}
        onCodeChanged={text => {
          setOtp(text);
        }}
      />
      <View style={styles.btnOtpTextContainer}>
        <Text style={styles.expectOtpText}>
          {"Expect OTP in "}
          {seconds === 0 && (
            <Text style={styles.notRecieveText}>Did Not Received?</Text>
          )}
          {seconds === 0 ? null : (
            <Text style={styles.secondText}>
              {seconds < 10 ? `0${seconds}s` : seconds + "s"}
            </Text>
          )}
        </Text>

        {seconds === 0 && (
          <Text
            style={[styles.secondText, { marginBottom: hp(2) }]}
            onPress={onPressSkip}
          >
            {"Skip"}
          </Text>
        )}

        <Button
          buttonStyle={styles.btnStyle}
          title={"continue"}
          onPress={onPressContinue}
        />
      </View>
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
  borderView: {
    borderWidth: 1,
    borderColor: "#EBF0FF",
    marginTop: hp(3.44),
  },
  enterMobileText: {
    marginTop: hp(3.89),
    paddingLeft: wp(4.26),
    fontSize: 16,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  verificationText: {
    marginTop: hp(4),
    fontSize: 16,
    fontWeight: "700",
    paddingLeft: wp(4.26),
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
  },
  underlineStyleBase: {
    width: wp(12),
    height: hp(Platform.OS === "ios" ? 6 : 7),
    borderWidth: 0,
    borderBottomWidth: 1,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: wp(2),
    color: colors.primary,
    fontSize: 25,
    fontWeight: "400",
  },
  underlineStyleHighLighted: {
    borderColor: colors.primary,
  },
  otpInputContainer: {
    width: "100%",
    height: hp(8),
    paddingHorizontal: hp(4.26),
    paddingTop: hp(7.51),
    elevation: 1,
  },
  numberText: {
    paddingLeft: wp(4.26),
    paddingTop: hp(1),
    fontSize: 10,
    fontWeight: "500",
    color: "#9098B1",
    fontFamily: fontFamily.medium,
  },
  expectOtpText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    paddingBottom: hp(1),
    fontFamily: fontFamily.regular,
    // borderWidth: 1,
  },
  btnOtpTextContainer: {
    marginTop: hp(12.06),
    marginHorizontal: wp(4.26),
  },
  notRecieveText: {
    width: "100%",
    // marginTop: 40,
    fontSize: 12,

    color: "#828282",
    zIndex: 10,
    fontFamily: fontFamily.medium,
  },
  secondText: {
    color: "black",
    fontFamily: fontFamily.bold,
    textAlign: "center",
  },
  btnStyle: { marginVertical: hp(0) },
});

//make this component available to the app
export default VerificationCode;
