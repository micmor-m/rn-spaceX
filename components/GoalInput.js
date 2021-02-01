import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");

  //manage the state for each key pressed
  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Course Goal"
        // only pass the reference  of the function without parentesis
        onChangeText={goalInputHandler}
        value={enteredGoal}
      />
      {/* whitout parentesis because I dont want the function execute immediatly */}
      <Button title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});

export default GoalInput;
