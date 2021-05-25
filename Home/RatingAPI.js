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

//Retrieve data from backend for FriendsPoll Questions
let unsubscribe; //Listener
let listenerArray = [];
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
  //listenerArray.push(unsubscribe); //push listener into the listener array
};

//Create another function:
export function GetQuestionsListener() {
  return () => listenerArray.forEach((unsubscribe) => unsubscribe());
}
