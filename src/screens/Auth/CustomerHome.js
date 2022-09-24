//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import CustomerHomeBox from "../../components/common/CustomeHomeBox";

import { hp, wp } from "../../helper/constants";
import { statusBarHeight } from "../../helper/constants";
import { colors } from "../../helper/utils";

// create a component
const CustomerHome = () => {
  const { navigate } = useNavigation();
  const data = [
    {
      id: 1,
      headerText: "Blown Film Plants",
      firstLineDes:
        "Customized Co-extrusion Blow Film Plants from 3 to \n9 Layers.",
      secondDes:
        "World Class technology platform with upto 1000 \nkgs/hr output and upto 3 meters width",
    },
    {
      id: 2,
      headerText: "Converting Machines",
      firstLineDes:
        "Servo Driven Bag Making, Pouch Making Machines \nand Wicketers. ",
      secondDes:
        "Complete range to take care of your bag/pouch \nmaking & converting needs.  ",
    },
    {
      id: 3,
      headerText: "Packaging Machines",
      firstLineDes:
        "Horizontal Form Fill Seal (HFFS), Pick Fill Seal (PFS) \n& Multi-lane Scahet Machines.",
      secondDes:
        "All Servo systems with high outputs, high hygiene & \nworld class technology.",
    },
  ];

  const onCardPress = index => {
    console.log("index", index);
    if (index == 0) {
      console.log("Called");
      navigate("ViewWeb", {
        title: "Blown Film Plants",
        url: "https://mamata.com/multilyer-blown-film-plants/",
      });
    } else if (index == 1) {
      navigate("ViewWeb", {
        title: "Converting Machines",
        url: "https://mamata.com/converting-machine/",
      });
      // Linking.openURL("https://mamata.com/converting-machine/");
    } else {
      navigate("ViewWeb", {
        title: "Packaging Machines",
        url: "https://mamata.com/packaging-machine/",
      });
      // Linking.openURL("https://mamata.com/packaging-machine/");
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginTop: hp(1), marginBottom: hp(4) }}>
        <CustomerHomeBox
          header={item.headerText}
          text={item.firstLineDes}
          secondText={item.secondDes}
          cardPress={() => onCardPress(index)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.borderColor,
    paddingTop: statusBarHeight,
  },
});

//make this component available to the app
export default CustomerHome;
