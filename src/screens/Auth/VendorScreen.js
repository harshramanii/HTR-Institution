//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import moment from "moment";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import DeviceInfo from "react-native-device-info";
import ImagePicker from "react-native-image-crop-picker";
import { CommonActions } from "@react-navigation/native";
import DocumentPicker from "react-native-document-picker";
import AsyncStorage from "@react-native-community/async-storage";

import { hp, wp } from "../../helper/constants";
import { verifyEmail } from "../../helper/Global";
import { icons } from "../../helper/iconConstants";
import { statusBarHeight } from "../../helper/constants";
import { vendorSubmitForm } from "../../actions/authAction";
import { colors, fontFamily } from "../../helper/utils";
import { ActivityLoader, Button, InputText } from "../../components";
import DocumentsModal from "../../components/common/DocumentsModal";

// create a component
const VendorScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [comapanyProductDetails, setCompanyProductDetails] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [typeOfFirm, setTypeOfFirm] = useState("");
  const [ssiUnit, setSsiUnit] = useState("");
  const [foreignCollaText, setForeignCollaText] = useState("");
  const [groupOfCompany, setGroupOfCompany] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [emailId, setEmailId] = useState("");
  const [work, setWork] = useState("");
  const [address, setAddress] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [warnCompanyName, setWarnCompanyName] = useState("");
  const [warnProductName, setWarnProductName] = useState("");
  const [warnTypeOfFirm, setWarnTypeOfFirm] = useState("");
  const [warnPhone, setWarnPhone] = useState("");
  const [warnEmailId, setWarnEmailId] = useState("");
  const [warnWork, setWarnWork] = useState("");
  const [warnAddress, setWarnAddress] = useState("");
  const [warnSsiUnit, setWarnSsiUnit] = useState("");
  const [warnForeignColl, setWarnForeignColl] = useState("");
  const [warnOtherCompanyGroup, setWarnOtherCompanyGroup] = useState("");
  const [warnestablishment, setWarnestablishment] = useState("");

  const clearState = () => {
    setWarnProductName("");
    setWarnCompanyName("");
    setWarnTypeOfFirm("");
    setWarnPhone("");
    setWarnEmailId("");
    setWarnWork("");
    setWarnAddress("");
  };

  useEffect(() => {
    const getUserInfoData = async () => {
      const userInfo = await AsyncStorage.getItem("USERBASICINFO");

      let displayData = JSON.parse(userInfo);

      setCompanyName(displayData?.companyName || "");
      setEmailId(displayData?.email || "");
      setPhone(displayData?.phone || "");
      setContactPersonName(displayData?.coVisitorName || "");
      // setContactPersonNumber(displayData?.coVisitorContact || "");

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
      setCompanyProductDetails(false);
      setFileUpload(image);
    });
  };

  const onPressGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setCompanyProductDetails(false);
      setFileUpload(image);
      console.log(image);
    });
  };
  const onPressDocuments = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });
    setCompanyProductDetails(false);

    console.log("res", res);
    setFileUpload(res?.[0]);
  };

  const onPressSubmit = async () => {
    if (isEmpty(companyName)) {
      // Alert.alert("Please enter the company name");
      setWarnCompanyName("Please enter the company name");
    } else if (isEmpty(productName)) {
      // Alert.alert("Please enter the product name");
      setWarnProductName("Please enter the product name");
    } else if (isEmpty(typeOfFirm)) {
      // Alert.alert("Please enter the Type of Firm");
      setWarnTypeOfFirm("Please enter the Type of Firm");
    } else if (isEmpty(phone)) {
      // Alert.alert("Please enter the phone");
      setWarnPhone("Please enter the phone");
    } else if (phone?.length != 10) {
      setWarnPhone("Please enter the valid phone number");
      // Alert.alert("Please enter the valid phone number");
    } else if (isEmpty(emailId)) {
      // Alert.alert("Please enter the email address");
      setWarnEmailId("Please enter the email address");
    } else if (!verifyEmail(emailId)) {
      setWarnEmailId("Please enter the valid email address");
      // Alert.alert("Please enter the valid email address");
    } else if (isEmpty(work)) {
      setWarnWork("Please enter the work");
      // Alert.alert("Please enter the work");
    } else if (isEmpty(address)) {
      setWarnAddress("Please enter the address");
      // Alert.alert("Please enter the address");
    }
    // else if (isEmpty(ssiUnit)) {
    //   setWarnSsiUnit("Please enter the SSI Unit");
    // }
    // else if (isEmpty(foreignCollaText)) {
    //   setWarnForeignColl("Please enter the Foreign Collaboration");
    // }
    // else if (isEmpty(groupOfCompany)) {
    //   setWarnOtherCompanyGroup("Please enter the Group of company");
    // }
    // else if (isEmpty(establishment)) {
    //   setWarnestablishment("Please enter the Establishment");
    // }
    else {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("companyname", companyName?.trim()?.toLowerCase() || "");
      formData.append("productname", productName?.trim()?.toLowerCase() || "");
      formData.append("type_of_firm", typeOfFirm?.trim()?.toLowerCase() || "");
      formData.append("ssi_unit", ssiUnit?.trim()?.toLowerCase() || "");
      formData.append(
        "foreign_collaboration",
        foreignCollaText?.trim()?.toLowerCase() || ""
      );
      formData.append(
        "other_group_of_company",
        groupOfCompany?.trim()?.toLowerCase() || ""
      );
      formData.append(
        "establishment",
        establishment?.trim()?.toLowerCase() || ""
      );
      formData.append(
        "contact_person_name",
        contactPersonName?.trim()?.toLowerCase() || ""
      );
      formData.append(
        "contact_Person_phone_no",
        contactPersonNumber?.trim()?.toLowerCase() || ""
      );
      formData.append("phone", phone?.trim()?.toLowerCase() || "");
      formData.append("emailid", emailId?.trim()?.toLowerCase() || "");
      formData.append("work", work?.trim()?.toLowerCase() || "");
      formData.append("address", address?.trim()?.toLowerCase() || "");
      formData.append("type", "employee");
      formData.append("employeeid", "2");
      formData.append("ip_address", (await DeviceInfo.getIpAddress()) || "");

      if (!isEmpty(fileUpload)) {
        let filePath = fileUpload?.sourceURL || fileUpload?.path;
        const getFileSplit = filePath?.split(".");
        var getFileExe = getFileSplit?.[getFileSplit?.length - 1] || "";
        formData.append("file_upload", {
          uri: filePath || "",
          name: moment().unix().toString().concat(`.${getFileExe}`),
          type: fileUpload?.mime,
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
      dispatch(vendorSubmitForm(request));
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
          <Text style={styles.selectionText}>{"As Vendor"}</Text>
          <View style={styles.borderView} />
          <View
            style={{
              paddingHorizontal: wp(4.26),
              marginTop: hp(2.52),
              marginBottom: hp(5),
            }}
          >
            <InputText
              placeholder={"Company Name*"}
              value={companyName}
              onChangeText={(t) => {
                setCompanyName(t);
                clearState();
              }}
              onBlur={() => {
                if (isEmpty(companyName)) {
                  setWarnCompanyName("Please enter the company name");
                }
              }}
              emailWarnText={warnCompanyName}
            />
            <InputText
              placeholder={"Product Name*"}
              value={productName}
              onChangeText={(t) => {
                setProductName(t);
                clearState();
              }}
              onBlur={() => {
                if (isEmpty(productName)) {
                  setWarnProductName("Please enter the product name");
                }
              }}
              emailWarnText={warnProductName}
            />
            <InputText
              placeholder={"Select Company Name / Type of Firm*"}
              value={typeOfFirm}
              onChangeText={(t) => {
                setTypeOfFirm(t);
                clearState();
              }}
              onBlur={() => {
                if (isEmpty(typeOfFirm)) {
                  setWarnTypeOfFirm(
                    "Please enter the Company Name / Type of Firm"
                  );
                }
              }}
              emailWarnText={warnTypeOfFirm}
            />
            <InputText
              placeholder={"SSI Unit"}
              value={ssiUnit}
              // emailWarnText={warnSsiUnit}
              onChangeText={(t) => {
                setSsiUnit(t);
                clearState();
              }}
              // onBlur={() => {
              //   if (isEmpty(ssiUnit)) {
              //     setWarnSsiUnit("Please enter the SSI Unit");
              //   }
              // }}
            />
            <InputText
              placeholder={"Foreign Collaboration"}
              value={foreignCollaText}
              // emailWarnText={warnForeignColl}
              onChangeText={(t) => {
                setForeignCollaText(t);
                clearState();
              }}
              // onBlur={() => {
              //   if (isEmpty(foreignCollaText)) {
              //     setWarnForeignColl("Please enter the Foreign Collaboration");
              //   }
              // }}
            />
            <InputText
              placeholder={"Other Group of Company"}
              value={groupOfCompany}
              // emailWarnText={warnOtherCompanyGroup}
              onChangeText={(t) => {
                setGroupOfCompany(t);
                clearState();
              }}
              // onBlur={() => {
              //   if (isEmpty(groupOfCompany)) {
              //     setWarnOtherCompanyGroup(
              //       "Please enter the Other Group of Company"
              //     );
              //   }
              // }}
            />
            <InputText
              placeholder={"Establishment"}
              value={establishment}
              // emailWarnText={warnestablishment}
              onChangeText={(t) => {
                setEstablishment(t);
                clearState();
              }}
              // onBlur={() => {
              //   if (isEmpty(establishment)) {
              //     setWarnestablishment("Please enter the Establishment");
              //   }
              // }}
            />
            <InputText
              placeholder={"Contact Person Name"}
              value={contactPersonName}
              onChangeText={(t) => {
                setContactPersonName(t);
                clearState();
              }}
            />
            <InputText
              placeholder={"Landline number"}
              value={contactPersonNumber}
              onChangeText={(t) => {
                setContactPersonNumber(t);
                clearState();
              }}
              keyboardType={"number-pad"}
              maxLength={10}
            />
            <InputText
              placeholder={"Phone*"}
              value={phone}
              keyboardType={"number-pad"}
              maxLength={10}
              onChangeText={(t) => {
                setPhone(t);
                clearState();
              }}
              onBlur={() => {
                if (isEmpty(phone)) {
                  setWarnPhone("Please enter the Phone");
                } else if (phone?.length != 10) {
                  setWarnPhone("Please enter the valid phone number");
                }
              }}
              emailWarnText={warnPhone}
            />
            <InputText
              placeholder={"Email-id*"}
              value={emailId}
              keyboardType={"email-address"}
              onChangeText={(t) => {
                setEmailId(t);
                clearState();
              }}
              emailWarnText={warnEmailId}
              onBlur={() => {
                if (isEmpty(emailId)) {
                  setWarnEmailId("Please enter the Email-id");
                }
              }}
            />
            <InputText
              placeholder={"Work*"}
              value={work}
              onChangeText={(t) => {
                setWork(t);
                clearState();
              }}
              emailWarnText={warnWork}
              onBlur={() => {
                if (isEmpty(work)) {
                  setWarnWork("Please enter the Work");
                }
              }}
            />
            <InputText
              placeholder={"Address*"}
              value={address}
              onChangeText={(t) => {
                setAddress(t);
                clearState();
              }}
              emailWarnText={warnAddress}
              onBlur={() => {
                if (isEmpty(address)) {
                  setWarnAddress("Please enter the Address");
                }
              }}
            />
            <InputText
              placeholder={
                isEmpty(fileUpload)
                  ? "File Upload"
                  : fileUpload?.filename ||
                    fileUpload?.name ||
                    `${fileUpload?.modificationDate || ""}.${
                      fileUpload?.mime?.split("/")?.[1] || ""
                    }`
              }
              source={icons.attach}
              editable={false}
              onRightButtonPress={() => {
                setCompanyProductDetails(!comapanyProductDetails);
              }}
              onPressIn={() =>
                setCompanyProductDetails(!comapanyProductDetails)
              }
              rightButtonStyle={{ height: hp(3.97), width: wp(3.97) }}
            />
            <Button title={"Submit"} onPress={onPressSubmit} />
          </View>

          <DocumentsModal
            isVisible={comapanyProductDetails}
            onPressCamera={onPressCamera}
            onPressGallery={onPressGallery}
            onPressDocuments={onPressDocuments}
            onBackdropPress={() => {
              setCompanyProductDetails(false);
            }}
          />
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
  borderView: {
    borderWidth: 1,
    borderColor: "#EBF0FF",
    marginTop: hp(3.44),
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
export default VendorScreen;
