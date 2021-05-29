import React, { useState, useEffect } from "react";
import { SearchBar } from "react-native-elements";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";

const SearchResults = (props) => {
  const ref = React.useRef(null);

  useScrollToTop(ref);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  //Display keyboard when navigating from Search to SearchReults (better UX)
  const searchInputRef = React.useRef();
  const focusOnInput = (e) => {
    searchInputRef.current.focus();
  };
  props.navigation.addListener("focus", focusOnInput);

  const fetchData = async () => {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=552dc8e3472476c7753a8d1ceb2cc71a&language=en-US&query=${query}&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => setNews(data.results))
      .then(() => setLoading(false))
      .catch((e) => Alert(e));
  };
  useEffect(() => {
    fetchData();
  }, [query]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Details", {
            title: item.title,
            overview: item.overview,
            date: item.release_date,
            rating: item.vote_average,
            pic: item.poster_path,
            movieID: item.id,
          })
        }
      >
        <View
          style={{
            borderRadius: 10,
            marginTop: 20,
            backgroundColor: "#161616",
            marginRight: 20,
            marginLeft: 20,
          }}
        >
          <View style={{ flexDirection: "row", padding: 15 }}>
            <View>
              {item.poster_path ? (
                <Image
                  style={{ width: 70, height: 100, borderRadius: 10 }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}`,
                  }}
                ></Image>
              ) : (
                <Image
                  style={{ width: 70, height: 100, borderRadius: 10 }}
                  source={{
                    uri:
                      "https://images.pexels.com/photos/2652346/pexels-photo-2652346.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  }}
                ></Image>
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <View style={{}}>
                <Text style={{ fontSize: 20, color: "white" }}>
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 30,
                  marginRight: 10,
                }}
              >
                <Foundation
                  style={{ marginRight: 6 }}
                  name="star"
                  size={16}
                  color="#ffd500"
                />
                <Text style={{ color: "white" }}>{item.vote_average}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <SearchBar
          ref={searchInputRef}
          containerStyle={{ width: "100%", backgroundColor: "black" }}
          inputContainerStyle={{ borderRadius: 10 }}
          value={query}
          onChangeText={(text) => setQuery(text)}
          placeholder="Search Movie Title"
        />
        <View style={{ height: 20 }}></View>
        <View style={styles.container}>
          {typeof news === "undefined" ? null : news && news.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Oh darn. We don't have that.
              </Text>
              <Text style={{ color: "white" }}>
                Try searching for another movie title
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={news}
              ref={ref}
              renderItem={renderItem}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default SearchResults;
