import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { getRated, getMyList } from "../Home/RatingAPI";

const ProfilePage = (props) => {
  const [rated, setRated] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    getRated(setRated, setIsLoading);
    //getMyList(setList, setIsLoading2);
  });

  const renderRatedItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            borderRadius: 10,
            marginTop: 20,
            backgroundColor: "#161616",
            marginRight: 20,
            marginLeft: 20,
          }}
        >
          <Image
            style={{ width: 120, height: 150, borderRadius: 10 }}
            source={{
              uri: `${item.pic}`,
            }}
          ></Image>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          marginTop: 15,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 100, height: 100, borderRadius: 80 }}
          source={{
            uri:
              "https://images.pexels.com/photos/2652346/pexels-photo-2652346.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
        />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ color: "white", fontSize: 23, fontWeight: "bold" }}>
            {props.firstName}{" "}
          </Text>
          <Text style={{ color: "white", fontSize: 23, fontWeight: "bold" }}>
            {props.lastName}
          </Text>
        </View>
        <View style={{ alignItems: "center", marginLeft: 30, marginRight: 30 }}>
          <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>
            {props.bio}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginLeft: 8,
            fontWeight: "700",
          }}
        >
          My ratings
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            data={rated}
            renderItem={renderRatedItem}
          />
        </View>
      )}
      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginLeft: 8,
            fontWeight: "700",
          }}
        >
          My List
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            data={rated}
            renderItem={renderRatedItem}
          />
        </View>
      )}
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    bio: state.bio,
  };
}

export default connect(mapStateToProps)(ProfilePage);

/* const fetchRated = async () => {
    await fetch("https://movie-rn-app.herokuapp.com/api/ratings", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
      .then((data) => setRated(data))
      .then(() => setLoading(false))
      .catch((e) => Alert(e));
  };*/
