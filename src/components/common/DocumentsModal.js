//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { icons } from "../../helper/iconConstants";
import { hp, wp } from "../../helper/constants";
import Modal from "react-native-modal";
import { colors, fontFamily } from "../../helper/utils";

// create a component
const DocumentsModal = ({
  isVisible,
  onBackdropPress,
  onPressCamera,
  onPressDocuments,
  onPressGallery,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={styles.modal}
    >
      <View style={styles.mainContainer}>
        <View style={styles.secondContainer}>
          <View style={styles.commonContainer}>
            <TouchableOpacity
              onPress={onPressCamera}
              style={styles.iconGalleryCamera}
            >
              <Image source={icons.camera} style={styles.imageCameraGallery} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>{"Camera"}</Text>
          </View>
          <View style={styles.commonContainer}>
            <TouchableOpacity
              onPress={onPressGallery}
              style={styles.iconGalleryCamera}
            >
              <Image source={icons.gallery} style={styles.imageCameraGallery} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>{"Gallery"}</Text>
          </View>
          <View style={styles.commonContainer}>
            <TouchableOpacity
              onPress={onPressDocuments}
              style={styles.documentBorder}
            >
              <Image source={icons.pdf} style={styles.documentImage} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>{"Document"}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  mainContainer: {
    height: hp(19),
    width: wp(88.86),
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 5,
  },
  secondContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(8.53),
  },
  commonContainer: { flexDirection: "column" },
  iconGalleryCamera: {
    borderColor: colors.primary,
    borderWidth: 0.5,
    height: wp(13.05),
    width: wp(13.05),
    borderRadius: 24.5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCameraGallery: { height: hp(2.21), width: wp(5.86) },
  textStyle: {
    paddingTop: hp(1.41),
    fontSize: 15,
    fontWeight: "400",
    fontFamily: fontFamily.regular,
  },
  documentImage: { height: hp(3), width: wp(5.86) },
  documentBorder: {
    borderColor: colors.primary,
    borderWidth: 0.5,
    height: wp(13.05),
    width: wp(13.05),
    borderRadius: 24.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(2.5),
  },
});

//make this component available to the app
export default DocumentsModal;
