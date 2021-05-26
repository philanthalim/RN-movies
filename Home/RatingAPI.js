import React from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export function checkID(checkedID) {
  firebase
    .firestore()
    .collection("ratings")
    .where("movieID", "==", checkedID.movieID)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        submitRating(checkedID);
      } else {
        Alert.alert("You have already submitted a rating for this movie!");
      }
    });
}
export function submitRating(submittedDetails) {
  /* submittedDetails is the object name */
  firebase.firestore().collection("ratings").add({
    movieID: submittedDetails.movieID,
    myRating: submittedDetails.myRating,
    overview: submittedDetails.overview,
    title: submittedDetails.title,
    pic: submittedDetails.pic,
  });
  setTimeout(() => Alert.alert("Rating submitted"), 300);
}
//Retrieve data from backend for ratings
export const getRated = async (setRated, setIsLoading) => {
  let list = [];
  var snapshot = await firebase
    .firestore()
    .collection("ratings")
    .orderBy("movieID", "desc")
    .get();
  snapshot.forEach((doc) => {
    list.push(doc.data());
  });
  setRated(list);
  setIsLoading(false);
};
export function checkID2(checkedID) {
  firebase
    .firestore()
    .collection("mylist")
    .where("movieID", "==", checkedID.movieID)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        submitRating2(checkedID);
      } else {
        Alert.alert("You have already added this to your list!");
      }
    });
}
export function submitRating2(submittedDetails) {
  /* submittedDetails is the object name */
  firebase.firestore().collection("ratings").add({
    movieID: submittedDetails.movieID,
    overview: submittedDetails.overview,
    title: submittedDetails.title,
    pic: submittedDetails.pic,
  });
  setTimeout(() => Alert.alert("Added to list!"), 300);
}

//Retrieve data from backend for ratings
export const getMyList = async (setList, setIsLoading2) => {
  let list = [];
  var snapshot = await firebase
    .firestore()
    .collection("mylist")
    .orderBy("movieID", "desc")
    .get();
  snapshot.forEach((doc) => {
    list.push(doc.data());
  });
  setList(list);
  setIsLoading2(false);
};
