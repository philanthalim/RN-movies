import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import "firebase/firestore";
import { Modalize } from "react-native-modalize";
import { checkID } from "./RatingAPI";
import { TagSelect } from "react-native-tag-select-max";
import { scale, moderateScale } from "react-native-size-matters";

const Details = (props) => {
  //For tagselect
  const TagNum = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
    { id: 6, label: "6" },
    { id: 7, label: "7" },
    { id: 8, label: "8" },
    { id: 9, label: "9" },
    { id: 10, label: "10" },
  ];
  const { title, overview, date, rating, pic, movieID } = props.route.params;
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open("Top");
  };
  let selectedTag;
  const afterSubmit = (ActionDone) => {
    checkID(ActionDone);
    modalizeRef.current?.close("Top");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={{ width: 200, height: 300, borderRadius: 10 }}
          source={{ uri: `https://image.tmdb.org/t/p/w400/${pic}` }}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}>
        <Text style={{ color: "white", fontSize: 16 }}>{overview}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={{ color: "white" }}>Rating: {rating}/10</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={{ color: "white" }}>Released on: {date}</Text>
      </View>
      <TouchableOpacity onPress={onOpen} style={styles.rateBtn}>
        <Text style={{ color: "black", fontSize: 20 }}>Rate</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }}></View>

      <Modalize
        modalStyle={{ backgroundColor: "#303030" }}
        adjustToContentHeight={true}
        rootStyle={{ bottom: -moderateScale(210) }}
        ref={modalizeRef}
      >
        <View style={{ borderRadius: 30, height: moderateScale(480) }}>
          <View style={styles.tsContainer}>
            <TagSelect
              data={TagNum}
              max={1}
              itemStyle={styles.item}
              itemStyleSelected={{ backgroundColor: "#b7c2cc" }}
              itemLabelStyle={{ fontSize: moderateScale(16), color: "white" }}
              onItemPress={(tag) => (selectedTag = tag)}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                try {
                  afterSubmit({
                    movieID: movieID,
                    title: title,
                    overview: overview,
                    myRating: selectedTag.id,
                    pic: `https://image.tmdb.org/t/p/w400/${pic}`,
                  });
                } catch (e) {
                  Alert.alert("Please select a rating!");
                }
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 22,
    marginTop: 15,
    fontWeight: "700",
  },
  ratingContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
  },
  tsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: moderateScale(20),
    marginTop: moderateScale(20),
  },
  item: {
    borderWidth: 1,
    borderColor: "#696969",
    borderRadius: scale(35),
    width: scale(55),
    height: scale(55),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  rateBtn: {
    height: 40,
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  submitBtn: {
    height: 40,
    borderColor: "#696969",
    marginTop: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
  },
});

export default Details;
