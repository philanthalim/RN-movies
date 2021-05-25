//UNUSED FILE
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../Popular";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import DetailsScreen from "../Details";
import {
  TouchableOpacity,
} from "react-native";


const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: "black",
      },
      headerTitleStyle: {
        fontSize: 25,
      },
      headerTitle: "",
      headerShown: true,
      unmountInactiveRoutes: true,
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log("pressed")}>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      ),
    }),
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: "black",
      },
      headerTitleStyle: {
        fontSize: 25,
      },
      headerTitle: "Details",
      headerShown: true,
      unmountInactiveRoutes: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign
            style={{ marginLeft: 19 }}
            name="arrowleft"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      ),
    }),
  },
});

export default createAppContainer(MainNavigator);
