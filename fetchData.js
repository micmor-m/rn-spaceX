import React from "react";
import { StyleSheet, View, Text } from "react-native";

//fetch data from API
const fetchData = async () => {
  //setCourseGoals([]);
  //GET all launches
  const response = await fetch(
    //"https://api.spacexdata.com/v3/launches?limit=10" //for test
    "https://api.spacexdata.com/v3/launches?limit=109" //the API return 2 flight with same number 110 so I limit the 109 since the number is my unique key
  );
  const launches = await response.json();

  //GET all launchpads
  const responseOne = await fetch("https://api.spacexdata.com/v3/launchpads");
  const launchPads = await responseOne.json();

  //create LAUNCHES data using the information returned by the API
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
          filteredLaunch.launch_date = humanDateFormat;
          break;
        case "launch_site":
          filteredLaunch.site_name = launch[key].site_name;
          break;
        case "launch_success":
          if (launch[key] === true) {
            filteredLaunch.launch_outcome = "Success";
          } else if (launch[key] === false) {
            filteredLaunch.launch_outcome = "Failure";
            filteredLaunch.failureReason = launch.launch_failure_details.reason;
          }
          break;
      }
    }
    if (filteredLaunch !== {}) {
      myData.push(filteredLaunch);
    }
  });

  //add more info to myData using information from LAUNCHPADS
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
  });

  //set state with myFinalData
  //setRockets(myFinalData);
  return myFinalData;
};

export default fetchData;
