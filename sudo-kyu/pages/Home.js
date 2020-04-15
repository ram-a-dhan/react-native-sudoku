import React, { useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from "react-native";

export default function Home({ navigation }) {
  // BackHandler.addEventListener("hardwareBackPress",() => true);
  const exit = () => {
    confirm("EXIT APP?", "Exit from Sudo-Kyu?",() => BackHandler.exitApp());
  }

  const [name, setName] = useState("");

  const changeName = (text) => {
    setName(text);
  };

  const gotoBoard = async (level) => {
    if (name.length < 3) {
      Alert.alert("INVALID NAME!", "Name must be at least 3 characters!");
    } else {
      await AsyncStorage.setItem("name", name);
      setName("");
      navigation.navigate("Board", { level });
    }
  };

  const confirm = (title, message, action) => {
    Alert.alert(title, message, [
      { text: "YES", onPress: action },
      { text: "NO", style: "cancel" },
    ]);
  };
  return (
    <KeyboardAvoidingView style={styles.containerHome}>
      <ScrollView>
        <Text style={[styles.text, styles.title]}>SUDO-KYU</Text>
        <Text style={[styles.text, styles.marBot]}>ENTER YOUR NAME:</Text>
        <TextInput
          style={[styles.nameStyle, styles.text, styles.marBot]}
          onChangeText={(text) => changeName(text)}
          defaultValue={name}
        ></TextInput>
        <Text style={[styles.text]}>SET THE LEVEL:</Text>
        <View style={[styles.fixToText, styles.marBot]}>
          {/* <Button title="START" color="green" onPress={gotoBoard}  /> */}
          <Button
            title="EASY"
            color="green"
            onPress={() => gotoBoard("easy")}
          />
          <Button
            title="MEDIUM"
            color=""
            onPress={() => gotoBoard("medium")}
          />
          <Button
            title="HARD"
            color="orange"
            onPress={() => gotoBoard("hard")}
          />
        </View>
        <View style={[styles.fixToText3, styles.marBot]}>
          <Button
            title="EXIT APP"
            color="red"
            onPress={() => exit()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282c34",
  },
  containerHome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282c34",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  warning: {
    color: "crimson",
    textAlign: "center",
  },
  title: {
    fontSize: 36,
    margin: 36,
  },
  rowStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#888",
    maxHeight: 36,
  },
  colStyle: {
    borderWidth: 1,
    borderColor: "#888",
    width: 36,
    height: 36,
    fontSize: 24,
  },
  apiInput: {
    color: "#61dafb",
    backgroundColor: "#3d4148",
  },
  userInput: {
    backgroundColor: "#24272e",
  },
  emptyCell: {
    color: "#444",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 24,
  },
  fixToText3: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingVertical: 24,
  },
  loadingBox: {
    width: 326,
    height: 326,
    borderWidth: 2,
    borderColor: "#888",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 36,
    margin: 0,
  },
  // startPage: {
  //   flexDirection: "column",
  //   justifyContent: "space-around",
  //   // paddingVertical: 24,
  // },
  nameStyle: {
    borderWidth: 1,
    color: "#61dafb",
    backgroundColor: "#3d4148",
    borderColor: "#888",
    fontSize: 24,
    height: 36,
  },
  marBot: {
    marginBottom: 36,
  },
});
