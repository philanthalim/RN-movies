import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage2 from "../Profile/ProfilePage2";
import EditProfile from "../Profile/EditProfile";
import SearchPage from "../Search/SearchPage";
import SearchResults from "../Search/SearchResults";
import Details from "../Home/Details";
import Quiz from "../Quiz/Quiz";
import { Text, View, TouchableOpacity } from "react-native";
import {
  AntDesign,
  FontAwesome,
  Feather,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStackScreen from "./TopBarNav";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();

function tabBarVisible(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Search" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Search";

  switch (routeName) {
    case "Search":
      return true;
    case "Search Results":
      return true;
    case "Details":
      return false;
  }
}
const SearchStackScreen = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: tabBarVisible(route),
    });
  }, [navigation, route]);
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
        }}
        name="Search"
        component={SearchPage}
      />
      <SearchStack.Screen
        options={{
          tabBarVisible: false,
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
        }}
        name="Search Results"
        component={SearchResults}
      />
      <SearchStack.Screen
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
    </SearchStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <MaterialIcons
                style={{ marginRight: 10, color: "white" }}
                name="edit"
                size={24}
              />
            </TouchableOpacity>
          ),
        }}
        name="My Profile"
        component={ProfilePage2}
      />
      <ProfileStack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
        }}
        name="Edit Profile"
        component={EditProfile}
      />
    </ProfileStack.Navigator>
  );
};

const QuizStack = createStackNavigator();
const QuizStackScreen = () => {
  return (
    <QuizStack.Navigator>
      <QuizStack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
        }}
        name="Video"
        component={Quiz}
      />
    </QuizStack.Navigator>
  );
};
const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: "white",
        inactiveTintolor: "grey",
        style: {
          backgroundColor: "black",
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <AntDesign
                name="home"
                size={24}
                style={{ color: focused ? "white" : "grey" }}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Feather color={color} name="search" size={24} />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FontAwesome
                style={{ color: focused ? "white" : "grey" }}
                name="user-circle"
                size={24}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
export default function BottomTabs() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
