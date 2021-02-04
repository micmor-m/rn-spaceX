import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    marginTop: 25,
    paddingTop: 16,
    backgroundColor: "#EF5B25",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});

export default Header;
