import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  return (
    <View style={{ padding: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder="Course Goal"
        />
        <Button title="ADD" />
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({});
