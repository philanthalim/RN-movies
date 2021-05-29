import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabs from "./Navigation/BottomTabs";
import { Provider } from "react-redux";
import { createStore } from "redux";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  StatusBar,
} from "react-native";
//import profileReducer from './Reducer/ProfileReducer'

const firebaseConfig = {
  apiKey: "AIzaSyAoR-A7D2S_xgTpWy29c2YebAeZX-OiHOU",
  authDomain: "rn-movie-7ee5b.firebaseapp.com",
  projectId: "rn-movie-7ee5b",
  storageBucket: "rn-movie-7ee5b.appspot.com",
  messagingSenderId: "208630996418",
  appId: "1:208630996418:web:683f9b448cc33189aeca5b",
  measurementId: "G-Z042X20HY0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const initialState = {
  firstName: "Zedd",
  lastName: "Corey",
  bio: "I love watching sci-fi movies!",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USERDETAILS": {
      return { ...state, ...action.data };
    }
    default:
      return state;
  }
};
const store = createStore(profileReducer);

export default function App() {
  return (
    <SafeAreaProvider>
     
      <Provider store={store}>
        <BottomTabs />
      </Provider>
    </SafeAreaProvider>
  );
}
