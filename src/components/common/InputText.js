//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { isEmpty } from "lodash";

import { hp, wp } from "../../helper/constants";
import { colors, fontFamily, fontSize } from "../../helper/utils";

// create a component
const InputText = ({
  icons,
  placeholder,
  value,
  maxLength,
  onChangeText,
  emailWarnText,
  source,
  multiline,
  inputView,
  onPressIn,
  onKeyPress,
  editable,
  keyboardType,
  rightButtonStyle,
  onRightButtonPress,
  passEntry,
  onBlur,
  rightIcon,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(passEntry);

  const onChangeSecureEntry = () => setIsSecureEntry(!isSecureEntry);

  const onFocusInput = () => setIsFocus(true);
  const onBlurInput = () => {
    if (onBlur) {
      onBlur();
    }
    setIsFocus(false);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        disabled={editable != false}
        onPress={onPressIn}
        style={[
          styles.inputContainer,
          {
            borderColor: !isEmpty(emailWarnText)
              ? colors.red
              : isFocus
              ? colors.primary
              : colors.borderColor,
          },
        ]}
      >
        {icons && (
          <Image
            source={icons}
            style={[
              styles.icon,
              {
                tintColor: !isEmpty(emailWarnText)
                  ? colors.red
                  : isFocus
                  ? colors.primary
                  : colors.borderColor,
              },
            ]}
            resizeMode={"contain"}
          />
        )}
        <TextInput
          value={value}
          secureTextEntry={isSecureEntry}
          maxLength={maxLength}
          placeholder={placeholder}
          style={[
            styles.inputContent,
            {
              fontFamily: isEmpty(value) ? fontFamily.regular : fontFamily.bold,
            },
            inputView,
          ]}
          editable={editable}
          onChangeText={onChangeText}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          placeholderTextColor={colors.placeholder}
          multiline={multiline}
          keyboardType={keyboardType}
          onPressIn={onPressIn}
          onKeyPress={onKeyPress}
        />

        <TouchableOpacity onPress={onRightButtonPress}>
          <Image
            resizeMode="contain"
            source={source}
            style={[
              { height: hp(0.73), width: wp(3.2), alignSelf: "center" },
              rightButtonStyle,
            ]}
          />
        </TouchableOpacity>
        {rightIcon && (
          <TouchableOpacity onPress={onChangeSecureEntry}>
            <Image
              source={isSecureEntry ? rightIcon.eyeClose : rightIcon.eyeOpen}
              style={{ height: wp(6), width: wp(6) }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {!isEmpty(emailWarnText) && (
        <Text style={styles.warnText}>{emailWarnText}</Text>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(1.72),
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: hp(1.72),
    paddingHorizontal: wp(4.84),
    borderRadius: wp(1.33),
    borderColor: colors.borderColor,
    alignItems: "center",
  },
  icon: {
    height: wp(5.33),
    width: wp(5.33),
    tintColor: colors.placeholder,
  },
  inputContent: {
    flex: 1,
    marginLeft: wp(3.38),
    fontFamily: fontFamily.regular,
    fontSize: fontSize(14),
    color: colors.placeholder,
    paddingVertical: 0,
  },
  warnText: {
    fontSize: fontSize(14),
    color: colors.red,
    fontWeight: "bold",
    marginTop: hp(0.5),
  },
});

//make this component available to the app
export default InputText;
