//import liraries
import AsyncStorage from "@react-native-community/async-storage";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Touchable,
} from "react-native";

import { Button, InputText } from "../../components";
import { hp, statusBarHeight, wp } from "../../helper/constants";
import { colors, fontFamily } from "../../helper/utils";

// create a component

const data = [
  {
    id: 1,
    option: "As Customer",
    dot: false,
  },
  {
    id: 2,
    option: "As Vendor",
    dot: false,
  },
  {
    id: 3,
    option: "For Job",
    dot: false,
  },
  {
    id: 4,
    option: "For Advertisement",
    dot: false,
  },
  {
    id: 5,
    option: "Other",
    dot: false,
  },
];

const SelectionUser = ({ navigation }) => {
  // const []

  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    const getUserBasicInfo = async () => {
      const data = await AsyncStorage.getItem("USERBASICINFO");
      console.log("data", data);
    };
    getUserBasicInfo();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderContainer}>
        <TouchableOpacity
          onPress={() => {
            const finalData = displayData?.map((items) => {
              return {
                ...items,
                dot: item?.id == items?.id,
              };
            });

            setDisplayData(finalData);
          }}
          style={styles.textBtnTouch}
        >
          <Text
            style={[
              styles.optionText,
              {
                color: item.dot === true ? colors.primary : colors.placeholder,
              },
            ]}
          >
            {item.option}
          </Text>

          <TouchableOpacity
            onPress={() => {
              const finalData = displayData?.map((items) => {
                return {
                  ...items,
                  dot: item?.id == items?.id,
                };
              });

              setDisplayData(finalData);
            }}
            style={[
              styles.roundBorderStyle,
              { borderColor: item.dot === true ? colors.primary : "#000" },
            ]}
          >
            {item.dot === true && <View style={styles.dotStyle}></View>}
          </TouchableOpacity>
        </TouchableOpacity>

        {item.id === 5 && item.dot === true && (
          <View style={styles.otherTextContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholder={"Enter Other User Name"}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.selectionText}>{"Selection Options"}</Text>
      <View style={styles.borderView} />
      <View>
        <FlatList data={displayData} renderItem={renderItem} />
        <Button
          buttonStyle={{ marginHorizontal: wp(4.26) }}
          title={"Continue "}
          onPress={() => {
            displayData.filter((item) => {
              if (item.id === 1 && item.dot === true) {
                navigation.navigate("CustomerHome");
              } else if (item.id === 2 && item.dot === true) {
                navigation.navigate("VendorScreen");
              } else if (item.id === 3 && item.dot === true) {
                navigation.navigate("ForJob");
              } else if (item.id === 4 && item.dot === true) {
                navigation.navigate("Advertisement");
              } else if (item.id === 5 && item.dot === true) {
                navigation.navigate("OtherForm");
              }
            });
            // navigation.navigate('');
          }}
        />
      </View>
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
  renderContainer: {
    marginTop: hp(2.52),
    paddingHorizontal: wp(4.26),
  },
  textBtnTouch: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  roundBorderStyle: {
    borderWidth: 1,
    height: wp(6.4),
    width: wp(6.47),
    justifyContent: "center",

    borderRadius: 15,
  },
  dotStyle: {
    height: wp(4.5),
    alignSelf: "center",
    width: wp(4.5),
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  otherTextContainer: {
    paddingHorizontal: wp(4.26),
    paddingTop: hp(2.94),
    paddingBottom: hp(2.5),
  },
  textInputStyle: {
    borderBottomWidth: 1,
    borderColor: "#9098B1",
  },
  selectionText: {
    marginTop: hp(4),
    paddingLeft: wp(4.26),
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
  },
});

//make this component available to the app
export default SelectionUser;
 