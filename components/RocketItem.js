import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const RocketItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={props.onToggle.bind(this, props.id, props.currentIndex)}
    >
      <View style={styles.listItem}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.info.mission_name}</Text>
          <Entypo name="rocket" size={24} color="black" />
        </View>

        {props.id === props.currentIndex && (
          <View style={styles.subCategoryList}>
            <Text>Mission name: {props.info.mission_name}</Text>
            <Text>Launch date: {props.info.launch_date}</Text>
            <Text>Site name: {props.info.site_name}</Text>
            <Text>Site latitude: {props.info.lat}</Text>
            <Text>Site longitude: {props.info.lng}</Text>
            <Text>Launch outcome: {props.info.launch_outcome}</Text>
            {props.info.launch_outcome === "Failure" && (
              <Text>Failure reson: {props.info.failureReason}</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    flexGrow: 1,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  cardContainer: {
    flexGrow: 1,
    backgroundColor: "#b19c944a",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default RocketItem;
