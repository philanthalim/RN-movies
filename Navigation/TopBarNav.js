import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Popular from "../Home/Popular";
import Details from "../Home/Details";
import New from "../Home/New";
import { TouchableOpacity } from "react-native";
import { AntDesign,FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator();

function tabBarVisible(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Home" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return true;
    case "Details":
      return false;
  }
}

const HomeStackScreen = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: tabBarVisible(route),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FontAwesome
            name="commenting-o"
            style={{
              color: "#444444",
              fontSize: 27,
              marginLeft: 9,
              marginTop: 8,
              position: "absolute",
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route]);


  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
        }}
        name="Home"
        children={MyTabs}
      />
      <HomeStack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
        }}
        name="Details"
        component={Details}
      />
    </HomeStack.Navigator>
  );
};

const MyTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          marginTop: 0,
          backgroundColor: "black",
        },
        indicatorStyle: {
          backgroundColor: "grey",
        },
        activeTintColor: "white",
        inactiveTintColor: "grey",
      }}
    >
      <Tab.Screen name="Popular" component={Popular}></Tab.Screen>
      <Tab.Screen name="New" component={New}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeStackScreen;
