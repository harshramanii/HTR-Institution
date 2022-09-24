//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputText from "./InputText";
import Button from "./Button";
import { hp, wp } from "../../helper/constants";
import DocumentsModal from "./DocumentsModal";
import { icons } from "../../helper/iconConstants";

// create a component
const SelectionUserForm = ({ place, rightPress, pressIn, rightBtnStyle }) => {
  const [resume, setResume] = useState(false);
  return (
    <View style={{ paddingHorizontal: wp(4.26) }}>
      <InputText placeholder={"Name"} />
      <InputText placeholder={"Phone"} />
      <InputText placeholder={"Email"} />
      <InputText placeholder={"City"} />
      <InputText placeholder={"Country"} />
      <InputText
        placeholder={place}
        source={icons.attach}
        editable={false}
        onRightButtonPress={() => {
          setResume(!resume);
        }}
        //   {rightPress}
        onPressIn={() => setResume(!resume)}
        //   {pressIn}

        rightButtonStyle={{ height: hp(3.97), width: wp(3.97) }}
        //   {rightBtnStyle}
      />
      <InputText
        placeholder={"Description(Other Details)"}
        multiline={true}
        inputView={{ marginBottom: hp(14) }}
      />
      <Button title={"Submit"} />
      <DocumentsModal
        isVisible={resume}
        onBackdropPress={() => {
          setResume(false);
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default SelectionUserForm;
