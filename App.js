import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  //manage the state for each key pressed
  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  //manage the state when the button is press
  const addGoalHandler = () => {
    console.log("Btn pressed");
    // make a copy by spread operator and add the new goal
    setCourseGoals((currentGoals) => [...currentGoals, enteredGoal]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Course Goal"
          // only pass the reference  of the function without parentesis
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        {/* whitout parentesis because I dont want the function execute immediatly */}
        <Button title="ADD" onPress={addGoalHandler} />
      </View>
      <View>
        {courseGoals.map((goal) => (
          <Text key={goal}>{goal}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 30 },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: { width: "80%", height: 40, borderColor: "gray", borderWidth: 1 },
});
