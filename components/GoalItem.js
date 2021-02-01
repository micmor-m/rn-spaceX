import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GoalItem = (props) => {
  console.log("Goal item props", props);
  return (
    // <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.listItem}>
        <Text>{props.info.mission_name}</Text>
        <View style={styles.subCategoryList}>
          <Text>Mission name: {props.info.mission_name}</Text>
          <Text>Launch date: {props.info.launch_date}</Text>
          <Text>Site name: {props.info.site_name}</Text>
          <Text>Site latitide: {props.info.lat}</Text>
          <Text>Site longitude: {props.info.lng}</Text>
          <Text>Launch success: {props.info.launch_success}</Text>
          <Text>
            Failure reason:{" "}
            {props.info.launch_success ? props.info.failureReason : " "}
          </Text>
        </View>
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
    flexGrow: 1,
  },
  cardContainer: {
    flexGrow: 1,
  },
});

export default GoalItem;
