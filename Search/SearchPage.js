import React, { useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { Foundation, Feather } from "@expo/vector-icons";

const SearchPage = (props) => {
  const ref = React.useRef(null);

  useScrollToTop(ref);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=552dc8e3472476c7753a8d1ceb2cc71a&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((data) => setNews(data.results))
      .then(() => setLoading(false))
      .catch((e) => Alert(e));
  };
  useEffect(() => {
    fetchData();
  });

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
              <Image
                style={{ width: 70, height: 100, borderRadius: 10 }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}`,
                }}
              ></Image>
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
    <View onPress={() => Keyboard.dismiss()} style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Search Results")}
        style={styles.searchBar}
      >
        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <Feather style={{ color: "white" }} name="search" size={24} />
          <Text style={{ color: "white", fontSize: 18, marginLeft: 5 }}>
            Search Movie Title
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ padding: 10 }}>
        <Text style={{ color: "white", fontSize: 20 }}>Top searches</Text>
      </View>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={news}
            renderItem={renderItem}
            ref={ref}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  searchBar: {
    backgroundColor: "grey",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SearchPage;
