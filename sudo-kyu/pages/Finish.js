import React, { useState, useEffect, useCallback } from "react";
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
import { secondsToHms } from "../helpers/timeConverter.js";

export default function Home({ route, navigation, leaderBoard }) {
  const dummy = [
    {name: "a", score: "1", time: "1", level: "a"},
    {name: "b", score: "2", time: "2", level: "b"},
    {name: "c", score: "3", time: "3", level: "c"},
    {name: "d", score: "4", time: "4", level: "d"},
    {name: "e", score: "5", time: "5", level: "e"},
    {name: "a", score: "1", time: "1", level: "a"},
    {name: "b", score: "2", time: "2", level: "b"},
    {name: "c", score: "3", time: "3", level: "c"},
    {name: "d", score: "4", time: "4", level: "d"},
    {name: "e", score: "5", time: "5", level: "e"},
  ];
  BackHandler.addEventListener("hardwareBackPress",() => true);
  const exit = () => {
    confirm("EXIT APP?", "Exit from Sudo-Kyu?",() => BackHandler.exitApp());
  }

  const [name, setName] = useState("");
  // const getName = useCallback(async () => {
  //   setName(await AsyncStorage.getItem("name"));
  // });
  useEffect(() => {
    // getName();
  }, []);
  const gotoHome = async () => {
    await AsyncStorage.removeItem("player");
    navigation.navigate("Home");
  };
  const confirm = (title, message, action) => {
    Alert.alert(title, message, [
      { text: "YES", onPress: action },
      { text: "NO", style: "cancel" },
    ]);
  };
  return (
    <KeyboardAvoidingView style={styles.containerHome}>
      <View>
        {(!name && (
          <>
            <Text style={[styles.text, styles.loadingText]}>Loading</Text>
            <Text style={[styles.text, styles.loadingText]}>...</Text>
          </>
        )) || (
          <>
            {/* <>
              <Text style={[styles.text, styles.title]}>FINISHED!</Text>
              <View style={[styles.marBot]}>
                <Text style={[styles.textSummary, styles.textLeft]}>Name:</Text>
                <Text
                  style={[styles.textSummary, styles.textRight, styles.textBold]}
                >
                  {name}
                </Text>
                <Text style={[styles.textSummary, styles.textLeft]}>Score:</Text>
                <Text
                  style={[styles.textSummary, styles.textRight, styles.textBold]}
                >
                  100
                </Text>
                <Text style={[styles.textSummary, styles.textLeft]}>Time:</Text>
                <Text
                  style={[styles.textSummary, styles.textRight, styles.textBold]}
                >
                  {secondsToHms(route.params.time)}
                </Text>
                <Text style={[styles.textSummary, styles.textLeft]}>Level:</Text>
                <Text
                  style={[styles.textSummary, styles.textRight, styles.textBold]}
                >
                  {route.params.level}
                </Text>
              </View>
            </> */}
            <>
              <>
                <Text style={[styles.text, styles.title]}>LEADERBOARD</Text>
                <View style={styles.fixToText}>
                  <Text style={[styles.text, styles.textBold]}>Name</Text>
                  <Text style={[styles.text, styles.textBold]}>Score</Text>
                  <Text style={[styles.text, styles.textBold]}>Time</Text>
                  <Text style={[styles.text, styles.textBold]}>Level</Text>
                </View>
                <ScrollView>
                  {
                    leaderBoard.map((data, idx) => {
                      return(
                        <View key={idx} style={styles.fixToText}>
                          <Text style={styles.text}>{data.name}</Text>
                          <Text style={styles.text}>{data.level}</Text>
                          <Text style={styles.text}>{secondsToHms(data.time)}</Text>
                          <Text style={styles.text}>{data.score}</Text>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </>
            </>
          </>
        )}
        <View style={[styles.marBot, styles.marTop]}>
          <Button title="NEW GAME" color="green" onPress={gotoHome} />
        </View>
        <View style={[styles.marBot]}>
          <Button
            title="EXIT APP"
            color="red"
            onPress={() => exit()}
        />
        </View>
      </View>
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
  textLeft: {
    color: "white",
    textAlign: "left",
  },
  textRight: {
    color: "white",
    textAlign: "right",
  },
  textBold: {
    fontWeight: "bold",
  },
  textSummary: {
    fontSize: 21,
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
    justifyContent: "space-around",
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
  marTop: {
    marginTop: 36,
  },
  marBot: {
    marginBottom: 36,
  },
});
