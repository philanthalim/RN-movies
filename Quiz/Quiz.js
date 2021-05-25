import React, { useState, useEffect } from "react";
import { Foundation } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

const Quiz = (props) => {

  return (
    <View style={styles.container}>
      <Text>Quiz</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default Quiz; 