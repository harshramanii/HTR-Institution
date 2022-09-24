import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

import { colors } from "../../helper/utils";
import { wp } from "../../helper/constants";

const ActivityLoader = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <Modal
      visible={true}
      transparent={true}
      statusBarTranslucent
      style={{ backgroundColor: colors.white }}
    >
      <View style={style.containerStyle}>
        <View style={style.indicatorViewStyle}>
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 999,
  },
  indicatorViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: wp(3),
    height: wp(25),
    width: wp(25),
  },
});

export default ActivityLoader;
