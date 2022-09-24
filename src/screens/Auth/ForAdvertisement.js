//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { isEmpty } from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from "react-native-document-picker";
import AsyncStorage from "@react-native-community/async-storage";

import { hp, wp } from "../../helper/constants";
import { verifyEmail } from "../../helper/Global";
import { icons } from "../../helper/iconConstants";
import { colors, fontFamily } from "../../helper/utils";
import { statusBarHeight } from "../../helper/constants";
import { getCountryData } from "../../actions/dataAction";
import DocumentsModal from "../../components/common/DocumentsModal";
import { advertisementSubmitForm } from "../../actions/authAction";
import CountryModal from "../../components/common/CountryModal";
import { ActivityLoader, Button, InputText } from "../../components";

// create a component
const ForAdvertisement = ({ navigation }) => {
  const dispatch = useDispatch();

  const { countryData } = useSelector((state) => state.data);

  const [resume, setResume] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [resumeFile, setResumeFile] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [warnName, setWarnName] = useState("");
  const [warnPhone, setWarnPhone] = useState("");
  const [warnEmail, setWarnEmail] = useState("");
  const [warnCity, setWarnCity] = useState("");
  const [warnCountry, setWarnCountry] = useState("");
  const [warnDesc, setWarnDesc] = useState("");

  const clearState = () => {
    setWarnName("");
    setWarnPhone("");
    setWarnEmail("");
    setWarnCity("");
    setWarnCountry("");
    setWarnDesc("");
  };

  useEffect(() => {
    const getCountry = () => {
      const request = {
        data: {},
        onSuccess: (res) => {},
        onFail: () => {},
      };
      dispatch(getCountryData(request));
    };
    getCountry();

    const getUserInfoData = async () => {
      const userInfo = await AsyncStorage.getItem("USERBASICINFO");

      let displayData = JSON.parse(userInfo);

      setEmail(displayData?.email || "");
      setPhone(displayData?.phone || "");
      setName(displayData?.name || "");
      setText(displayData?.country || "");

      console.log("userInfo", JSON.parse(userInfo));
    };
    getUserInfoData();
  }, []);

  const onPressCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setResume(false);
      setResumeFile(image);
    });
  };

  const onPressGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setResume(false);
      setResumeFile(image);
      console.log(image);
    });
  };

  const onPressDocuments = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });
    setResume(false);

    console.log("res", res);
    setResumeFile(res?.[0]);
  };

  const onPressSubmit = () => {
    if (isEmpty(name)) {
      // Alert.alert("Please enter the name");
      setWarnName("Please enter the name");
    } else if (isEmpty(phone)) {
      setWarnPhone("Please enter the phone");
    } else if (phone?.length != 10) {
      // Alert.alert("Please enter the valid phone");
      setWarnPhone("Please enter the valid phone");
    } else if (isEmpty(email)) {
      // Alert.alert("Please enter the email");
      setWarnEmail("Please enter the email");
    } else if (!verifyEmail(email)) {
      setWarnEmail("Please enter the valid email");
      // Alert.alert("Please enter the valid email");
    } else if (isEmpty(city)) {
      // Alert.alert("Please enter the city");
      setWarnCity("Please enter the city");
    } else if (isEmpty(text)) {
      // Alert.alert("Please select the country");
      setWarnCountry("Please select the country");
    } else if (isEmpty(description)) {
      // Alert.alert("Please enter the description");
      setWarnDesc("Please enter the description");
    } else {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("phone", phone?.trim()?.toLowerCase());
      formData.append("name", name?.trim()?.toLowerCase());
      formData.append("email", email?.trim()?.toLowerCase());
      formData.append("city", city?.trim()?.toLowerCase());
      formData.append("country", text?.trim()?.toLowerCase());
      formData.append("description", description?.trim()?.toLowerCase());

      if (!isEmpty(resumeFile)) {
        let filePath = resumeFile?.sourceURL || resumeFile?.path;
        const getFileSplit = filePath?.split(".");
        var getFileExe = getFileSplit?.[getFileSplit?.length - 1] || "";
        formData.append("advertisementimg", {
          uri: filePath || "",
          name: moment().unix().toString().concat(`.${getFileExe}`),
          type: resumeFile?.mime,
        });
      }

      const request = {
        data: formData,
        onSuccess: () => {
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
      dispatch(advertisementSubmitForm(request));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{ flex: 1 }}
      >
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text style={styles.selectionText}>{"Selection Options"}</Text>
          <View style={styles.borderView} />
          <View style={{ paddingTop: hp(1.34) }}>
            {/* <SelectionUserForm place={"Attach File"} /> */}
            <View style={{ paddingHorizontal: wp(4.26) }}>
              <InputText
                placeholder={"Name*"}
                value={name}
                onChangeText={(t) => {
                  setName(t);
                  clearState();
                }}
                emailWarnText={warnName}
                onBlur={() => {
                  if (isEmpty(name)) {
                    setWarnName("Please enter the name");
                  }
                }}
              />
              <InputText
                placeholder={"Phone*"}
                value={phone}
                onChangeText={(t) => {
                  setPhone(t);
                  clearState();
                }}
                keyboardType={"number-pad"}
                maxLength={10}
                emailWarnText={warnPhone}
                onBlur={() => {
                  if (isEmpty(phone)) {
                    setWarnPhone("Please enter the phone");
                  } else if (phone?.length != 10) {
                    setWarnPhone("Please enter the valid phone");
                  }
                }}
              />
              <InputText
                placeholder={"Email*"}
                value={email}
                keyboardType={"email-address"}
                onChangeText={(t) => {
                  setEmail(t);
                  clearState();
                }}
                onBlur={() => {
                  if (isEmpty(email)) {
                    setWarnEmail("Please enter the Email");
                  } else if (!isEmpty(email) && !verifyEmail(email)) {
                    setWarnEmail("Please enter the valid name");
                  }
                }}
                emailWarnText={warnEmail}
              />
              <InputText
                placeholder={"City*"}
                value={city}
                onChangeText={(t) => {
                  setCity(t);
                  clearState();
                }}
                onBlur={() => {
                  if (isEmpty(city)) {
                    setWarnCity("Please enter the City");
                  }
                }}
                emailWarnText={warnCity}
              />
              {/* <InputText placeholder={"Country"} /> */}
              <InputText
                editable={false}
                placeholder="Country*"
                source={icons.downArrow}
                value={text}
                onPressIn={() => {
                  setIsVisible(!isVisible);
                }}
                emailWarnText={warnCountry}
                onBlur={() => {
                  if (isEmpty(text)) {
                    setWarnCountry("Please enter the Country");
                  }
                }}
              />
              {isVisible && (
                <View style={styles.modalContainer}>
                  <TextInput
                    style={{
                      paddingHorizontal: wp(4),
                      paddingVertical: hp(1.5),
                      color: colors.black,
                    }}
                    value={searchText}
                    placeholder={"Search your country..."}
                    onChangeText={setSearchText}
                  />

                  <View style={{ borderWidth: 1, borderColor: "lightgrey" }} />
                  <FlatList
                    data={countryData?.filter((e) =>
                      e?.toLowerCase()?.includes(searchText.toLowerCase())
                    )}
                    nestedScrollEnabled
                    ListEmptyComponent={() => (
                      <Text
                        style={{
                          marginTop: hp(2),
                          color: colors.black,
                          textAlign: "center",
                        }}
                      >
                        {"No Country Found"}
                      </Text>
                    )}
                    renderItem={({ item }) => {
                      return (
                        <CountryModal
                          text={item}
                          onPress={() => {
                            setIsVisible(false);
                            setText(item);
                          }}
                        />
                      );
                    }}
                  />
                </View>
              )}
              <InputText
                placeholder={
                  isEmpty(resumeFile)
                    ? "Attach File"
                    : resumeFile?.filename ||
                      resumeFile?.name ||
                      `${resumeFile?.modificationDate || ""}.${
                        resumeFile?.mime?.split("/")?.[1] || ""
                      }`
                }
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
                placeholder={"Description(Other Details)*"}
                multiline={true}
                value={description}
                onChangeText={(t) => {
                  setDescription(t);
                  clearState();
                }}
                emailWarnText={warnDesc}
                inputView={{ marginBottom: hp(14) }}
                onBlur={() => {
                  if (isEmpty(description)) {
                    setWarnDesc("Please enter the Description");
                  }
                }}
              />
              <Button title={"Submit"} onPress={onPressSubmit} />
              <DocumentsModal
                isVisible={resume}
                onPressCamera={onPressCamera}
                onPressGallery={onPressGallery}
                onPressDocuments={onPressDocuments}
                onBackdropPress={() => {
                  setResume(false);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  modalContainer: {
    backgroundColor: "White",
    height: hp(24.3),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
  },
});

//make this component available to the app
export default ForAdvertisement;
