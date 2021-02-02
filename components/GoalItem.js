import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GoalItem = (props) => {
  //console.log("Goal item props", props);
  return (
    // <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={props.onToggle.bind(this, props.id, props.currentIndex)}
    >
      <View style={styles.listItem}>
        <Text>{props.info.mission_name}</Text>
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
    flexGrow: 1,
  },
  cardContainer: {
    flexGrow: 1,
  },
});

export default GoalItem;
