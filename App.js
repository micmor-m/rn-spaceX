import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as Font from "expo-font";

import RocketItem from "./components/RocketItem";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import fetchData from "./fetchData";

//Import extra fonts
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  //states
  const [rockets, setRockets] = useState([]);
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

  //to handle the toggle of armonion
  const toggleHandler = (id, currentIndex) => {
    if (id === currentIndex) {
      setCurrentIndex(null);
    } else {
      setCurrentIndex(id);
    }
  };

  //fetch data from API
  fetchData().then((data) => {
    setRockets(data);
  });

  return (
    <View style={styles.screen}>
      <Header title="SpaceX Rocket" />
      <FlatList
        keyExtractor={(item, index) => item.flight_number.toString()}
        data={rockets}
        renderItem={(itemData) => (
          <RocketItem
            id={itemData.item.flight_number}
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
