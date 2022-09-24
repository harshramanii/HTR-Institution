//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { hp, wp } from "../../helper/constants";
import { colors, fontFamily, fontSize } from "../../helper/utils";

// create a component
const CustomerHomeBox = ({
  header,
  secondText,
  text,
  pressEnterBtn,
  cardPress,
}) => {
  return (
    <View>
      <View style={styles.boxContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerTextStyle}>{header}</Text>
          <Text style={styles.textStyle}>{text}</Text>
          <Text style={styles.secondTextStyle}>{secondText}</Text>
          <TouchableOpacity onPress={cardPress} style={styles.btnContainer}>
            <Text style={styles.buttonTextStyle} onPress={pressEnterBtn}>
              {"ENTER"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  boxContainer: {
    // marginTop: hp(3),
    // marginBottom: hp(8),
    height: hp(38.5),
    backgroundColor: colors.white,
    marginHorizontal: wp(3),
    borderBottomWidth: 2,
    borderColor: colors.primary,
    borderRadius: 3,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    paddingHorizontal: wp(8),
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(9),
  },
  headerTextStyle: { fontSize: fontSize(22), fontFamily: fontFamily.medium },
  textStyle: {
    textAlign: "center",
    fontSize: fontSize(12),
    fontFamily: fontFamily.regular,
    paddingTop: hp(3),
  },
  secondTextStyle: {
    textAlign: "center",
    fontSize: fontSize(12),
    fontFamily: fontFamily.regular,
    paddingTop: hp(1),
  },
  btnContainer: {
    borderWidth: 2,
    marginTop: hp(3),
    borderColor: colors.black,
    paddingVertical: hp(0.65),
    paddingHorizontal: wp(5),
  },
  buttonTextStyle: {
    fontSize: fontSize(15),
    fontFamily: fontFamily.medium,
  },
});

//make this component available to the app
export default CustomerHomeBox;
