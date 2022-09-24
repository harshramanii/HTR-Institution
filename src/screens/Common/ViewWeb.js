import React, { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { hp, wp } from "../../helper/constants";
import { colors, fontFamily } from "../../helper/utils";

const ViewWeb = ({ route }) => {
  const displayData = route?.params;

  useEffect(() => {
    console.log("route?.params", route?.params);
  }, [route?.params]);

  console.log("displayData", displayData);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <Text style={styles.selectionText}>{displayData?.title || ""}</Text>
      <View style={styles.borderView} />
      <WebView
        style={styles.mainContainer}
        source={{ uri: displayData?.url || "" }}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectionText: {
    marginTop: hp(4),
    paddingLeft: wp(4.26),
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fontFamily.bold,
    color: colors.authTitle,
  },
  borderView: {
    borderWidth: 1,
    borderColor: "#EBF0FF",
    marginTop: hp(3.44),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default ViewWeb;
