import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import { connect, useDispatch } from "react-redux";

const EditProfile = (props) => {
  const [characterCount1, setCharacterCount1] = useState(
    15 - props.firstName.length
  );
  const [characterCount2, setCharacterCount2] = useState(
    15 - props.lastName.length
  );
  const [characterCount3, setCharacterCount3] = useState(50 - props.bio.length);

  const characterCount = (text, fieldType) => {
    switch (fieldType) {
      case "firstName": {
        var length = 15 - text.length.toString();
        setFirst(text);
        setCharacterCount1(length);
        break;
      }
      case "lastName": {
        var length = 15 - text.length.toString();
        setLast(text);
        setCharacterCount2(length);
        break;
      }
      case "bio": {
        var length = 50 - text.length.toString();
        setBio(text);
        setCharacterCount3(length);
        break;
      }
    }
  };
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [bio, setBio] = useState("");
  //const headerHeight=useHeaderHeight()

  //if input is empty,dispatch old name(props.firstName) otherwise, dispatch new name
  let firstname = first != "" ? first : props.firstName;
  let lastname = last != "" ? last : props.lastName;
  let Bio = bio != "" ? bio : props.bio;
  const dispatch = useDispatch();

  const updateUserDetails = (item) => {
    dispatch({
      type: "UPDATE_USERDETAILS",
      data: item,
    });
    props.navigation.navigate("My Profile");
  };

  const submit = () => {
    AsyncStorage.clear()
    updateUserDetails({ firstName: firstname, lastName: lastname, bio: Bio });
  };


  return (
    <KeyboardAvoidingView
      /*keyboardVerticalOffset={550}*/
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Image
              style={{ width: 100, height: 100, borderRadius: 80 }}
              source={{
                uri:
                  "https://images.pexels.com/photos/2652346/pexels-photo-2652346.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
            />
          </View>
          <TextInput
            clearButtonMode="while-editing"
            maxLength={15}
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#B1B1B1"
            returnKeyType="done"
            autoCapitalize="none"
            defaultValue={props.firstName}
            onChangeText={(text) => characterCount(text, "firstName")}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ color: "white", marginRight: 30 }}>
              {characterCount1}
            </Text>
          </View>
          <TextInput
            clearButtonMode="while-editing"
            maxLength={15}
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#B1B1B1"
            returnKeyType="done"
            autoCapitalize="none"
            defaultValue={props.lastName}
            onChangeText={(text) => characterCount(text, "lastName")}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ color: "white", marginRight: 30 }}>
              {characterCount2}
            </Text>
          </View>
          <TextInput
            multiline={true}
            maxLength={50}
            style={styles.bioInput}
            placeholder="Bio"
            placeholderTextColor="#B1B1B1"
            returnKeyType="done"
            autoCapitalize="none"
            defaultValue={props.bio}
            onChangeText={(text) => characterCount(text, "bio")}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ color: "white", marginRight: 30 }}>
              {characterCount3}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.BackgroundDesign}
              onPress={() => submit()}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

//get state from store
function mapStateToProps(state) {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    bio: state.bio,
  };
}

export default connect(mapStateToProps)(EditProfile);

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    marginTop: 25.5,
    backgroundColor: "black",
    width: "90%",
    paddingLeft: 6,
    marginLeft: "5%",
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    color: "white",
  },
  bioInput: {
    fontSize: 18,
    marginTop: 25.5,
    backgroundColor: "black",
    width: "90%",
    paddingLeft: 6,
    marginLeft: "5%",
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    color: "white",
    borderRadius: 10,
  },
  BackgroundDesign: {
    backgroundColor: "white",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  textStyle: {
    fontSize: 19,
    color: "black",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
  },
});
