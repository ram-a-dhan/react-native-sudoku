import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  BackHandler,
} from "react-native";

export default function Board({ route, navigation }) {
  BackHandler.addEventListener("hardwareBackPress",() => true);

  //// STATE INITIALIZATIONS ////
  const [board, setBoard] = useState([]);
  const [input, setInput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [time, setTime] = useState(0);
  ///////////////////////////////

  //// SUGOKU API-RELATED SCRIPTS ////
  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );
  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");

  const fetchSugoku = useCallback(async () => {
    setLoading(true);
    const endpoint = `https://sugoku.herokuapp.com/board?difficulty=${route.params.level}`;
    const response = await fetch(endpoint);
    const { board } = await response.json();
    setBoard(board);
    setInput(board);
    setGiveUp(false);
    setLoading(false);
    // startTimer();
    // resetTimer();
  }, []);
  useEffect(() => {
    setGiveUp(false);
    fetchSugoku();
  }, []);
  const checkSugoku = async () => {
    setLoading(true);
    const data = { board: input };
    const endpoint = `https://sugoku.herokuapp.com/validate`;
    const options = {
      method: "POST",
      body: encodeParams(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await fetch(endpoint, options);
    const { status } = await response.json();
    if (status === "solved") {
      //
      // resetTimer();
      navigation.navigate("Finish", { level: route.params.level });
    } else {
      Alert.alert("UNSOLVED", "Incorrect answers! Keep trying!", [
        { text: "CONTINUE" },
      ]);
    }
    setLoading(false);
  };
  const solveSugoku = async () => {
    resetTimer();
    setLoading(true);
    const data = { board };
    const endpoint = `https://sugoku.herokuapp.com/solve`;
    const options = {
      method: "POST",
      body: encodeParams(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await fetch(endpoint, options);
    const { solution } = await response.json();
    setInput(solution);
    setGiveUp(true);
    setLoading(false);
  };
  ////////////////////////////////////

  //// EVENT HANDLERS ////
  const handleChange = (text, i, j) => {
    let newInput = [],
      temp = [];
    for (let x = 0; x < input.length; x++) {
      for (let y = 0; y < input[x].length; y++) {
        temp.push(Number(input[x][y]));
      }
      newInput.push(temp);
      temp = [];
    }
    newInput[i][j] = Number(text);
    setInput(newInput);
  };

  const resetSugoku = () => {
    setInput(board);
    resetTimer();
    // startTimer();
  };

  const confirm = (title, message, action) => {
    Alert.alert(title, message, [
      { text: "YES", onPress: action },
      { text: "NO", style: "cancel" },
    ]);
  };
  var startTimer = () => {
    setInterval(() => {
      console.log(time, "sec");
      setTime(time + 1);
      // console.warn(time,'sec');
    }, 1000);
  };
  var resetTimer = () => {
    clearInterval(startTimer);
    setTime(0);
  };
  const gotoHome = async () => {
    resetTimer();
    await AsyncStorage.removeItem("name");
    navigation.navigate("Home");
  };
  ////////////////////////

  // {!giveUp && ()} // ini sebagai cadangan. lihat komentar di line 200 utk penjelasan

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        {(loading && (
          <>
            <Text style={[styles.text]}></Text>
            <View style={styles.loadingBox}>
              <Text style={[styles.text, styles.loadingText]}>loading</Text>
              <Text style={[styles.text, styles.loadingText]}>...</Text>
            </View>
          </>
        )) || (
          <View>
            <View style={[styles.fixToText2]}>
              <Text style={[styles.text]}>Time: {time} secs</Text>
              <Text style={[styles.text]}>Level: {route.params.level}</Text>
            </View>
            {input.map((row, i) => (
              <View key={i} style={styles.rowStyle}>
                {row.map((col, j) => {
                  if (board[i][j]) {
                    return (
                      <TextInput
                        key={j}
                        style={[styles.colStyle, styles.text, styles.apiInput, styles.lightBg]}
                        keyboardType="numeric"
                        maxLength={1}
                        editable={false}
                        defaultValue={col.toString()}
                      ></TextInput>
                    );
                  } else {
                    return (
                      <TextInput
                        key={j}
                        style={[styles.colStyle, styles.text, styles.userInput, styles.darkBg]}
                        keyboardType="numeric"
                        maxLength={1}
                        editable={true}
                        onChangeText={(text) => handleChange(text, i, j)}
                      >
                        {col === 0 ? "" : col}
                      </TextInput>
                    );
                  }
                })}
              </View>
            ))}
          </View>
        )}
        {!loading && (
          <>
          {!giveUp && ( // hapus line ini & bracket penutupnya untuk testing laman Finish
            <View style={styles.fixToText}>
              <>
                <Button
                  title="GIVE UP"
                  color="grey"
                  onPress={() =>
                    confirm("GIVING UP?", "Give up and see the solution?", () =>
                      solveSugoku()
                    )
                  }
                />
                <Button title="CHECK" color="" onPress={checkSugoku} />
                <Button
                  title="RESTART"
                  color="darkorange"
                  onPress={() =>
                    confirm(
                      "RESET BOARD?",
                      "Clear your input and start over?",
                      () => resetSugoku()
                    )
                  }
                />
              </>
            </View>
          )}
            <View style={styles.fixToText}>
              <Button
                title="GO TO HOME"
                color="green"
                onPress={() =>
                  confirm(
                    "BACK TO HOME?",
                    "Quit this game and go back to Home?",
                    () => gotoHome()
                  )
                }
              />
              <Button
                title="NEW BOARD"
                color="crimson"
                onPress={() =>
                  confirm(
                    "PLAY NEW BOARD?",
                    "Get a different new board to play?",
                    () => fetchSugoku()
                  )
                }
              />
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "white",
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
  },
  lightBg: {
    backgroundColor: "#3d4148",
  },
  darkBg: {
    backgroundColor: "#24272e",
  },
  userInput: {
    color: "white",
  },
  emptyCell: {
    color: "#444",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginTop: 24,
  },
  fixToText2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
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
});
