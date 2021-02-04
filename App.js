import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import * as Font from "expo-font";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false); //to handle modal
  const [currentIndex, setCurrentIndex] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log("Error AppLoading:", error)}
      />
    );
  }

  //fetch data from API
  fetchData = async () => {
    //setCourseGoals([]);
    const response = await fetch(
      "https://api.spacexdata.com/v3/launches?limit=10"
      // "https://api.spacexdata.com/v3/launches?limit=109" //the API return 2 flight with same number 110
    );
    // return response;
    const launches = await response.json();
    //console.log(launches);
    const responseOne = await fetch("https://api.spacexdata.com/v3/launchpads");
    const launchPads = await responseOne.json();
    //console.log(launchPads);
    const myData = [];
    launches.forEach((launch) => {
      const filteredLaunch = {};
      for (const key in launch) {
        switch (key) {
          case "flight_number":
            filteredLaunch.flight_number = launch[key];
            break;
          case "mission_name":
            filteredLaunch.mission_name = launch[key];
            break;
          case "launch_date_unix":
            const unixTimestamp = launch[key];
            const milliseconds = unixTimestamp * 1000;
            const dateObject = new Date(milliseconds);
            const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
            // const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
            //   year: "numeric",
            //   month: "long",
            //   day: "numeric",
            // });
            // const dayOfMonth = humanDateFormat.getDate();
            // const month = humanDateFormat.getMonth();
            // const year = humanDateFormat.getFullYear();
            // const dateString = dayOfMonth + "-" + (month + 1) + "-" + year;
            filteredLaunch.launch_date = humanDateFormat;
            break;
          case "launch_site":
            //console.log("LounchKEY is ", launch[key]);
            filteredLaunch.site_name = launch[key].site_name;
            break;
          case "launch_success":
            if (launch[key] === true) {
              filteredLaunch.launch_outcome = "Success";
            } else if (launch[key] === false) {
              filteredLaunch.launch_outcome = "Failure";
              filteredLaunch.failureReason =
                launch.launch_failure_details.reason;
            }
            break;
        }
      }
      if (filteredLaunch !== {}) {
        myData.push(filteredLaunch);
      }
      // return myData;
    });

    // console.log("MY DATA", myData);
    const myFinalData = [];
    myData.forEach((launch) => {
      //add coordinates
      const target = launchPads.find(
        (element) => element.name === launch.site_name
      );
      if (target) {
        launch.lat = target.location.latitude;
        launch.lng = target.location.longitude;
      }
      myFinalData.push(launch);
      //console.log("MY FINAL DATA", myFinalData);
    });
    // setCourseGoals(() => courseGoals.concat(myFinalData));
    //setCourseGoals([]);
    setCourseGoals(myFinalData);
    //return myFinalData;
    // //console.log("courseGoals", courseGoals);
  };

  // componentDidMount = () => {
  //   fetchData();
  // };

  //manage the state when the button is press
  const addGoalHandler = (goalTitle) => {
    // make a copy by spread operator and add the new goal
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    //close modal after update the goal
    setIsAddMode(false);
  };

  //manage to delete a component in the rendered list
  // const removeGoalHandler = (goalId) => {
  //   setCourseGoals((currentGoals) => {
  //     return currentGoals.filter((goal) => goal.id !== goalId);
  //   });
  // };

  const cancelGoalAdditionHandler = () => {
    //close modal after update the goal
    setIsAddMode(false);
  };

  const toggleHandler = (id, currentIndex) => {
    if (id === currentIndex) {
      setCurrentIndex(null);
    } else {
      setCurrentIndex(id);
    }
  };

  fetchData();

  return (
    <View style={styles.screen}>
      {/* <Button title="Add New Goal" onPress={() => setIsAddMode(true)} /> */}
      {/* <Button title="Add New Goal" onPress={fetchData} /> */}
      <Header title="SpaceX Rocket" />
      <FlatList
        keyExtractor={(item, index) => item.flight_number.toString()}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.flight_number}
            // onDelete={removeGoalHandler}
            onToggle={toggleHandler}
            info={itemData.item}
            currentIndex={currentIndex}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 0 },
});
