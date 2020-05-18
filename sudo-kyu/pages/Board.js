import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
  ToastAndroid,
} from "react-native";
import { encodeParams } from "../helpers/encodeSugoku";
import { useInterval } from "../helpers/stopwatch.js";
import { inGameTime } from "../helpers/timeConverter.js";
import { loadFonts } from "../helpers/fontsLoader";
import { scoreCalc } from "../helpers/scoreCalculator";
import { confirm } from "../helpers/confirmBox";

export default function Board({ route, navigation, leaderBoard, setLeaderBoard }) {

  //// STATE INITIALISATIONS ////
  const [name, setName] = useState("");
  const [fontsReady, setFontsReady] = useState(false);
  const [board, setBoard] = useState([]);
  const [input, setInput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);
  ///////////////////////////////

  useEffect(() => {
    getName();
    loadFonts()
      .then(() => setFontsReady(true));
    setGiveUp(false);
    fetchSugoku();
  }, []);

  const getName = useCallback(async () => {
    setName(await AsyncStorage.getItem("name"));
  });

  useInterval(() => {
    setTime(time + 1);
  }, paused ? null : 1000);

  //// SUGOKU API ////
  const fetchSugoku = useCallback(async () => {
    setPaused(true);
    setLoading(true);
    const endpoint =
      `https://sugoku2.herokuapp.com/board?difficulty=${route.params.level}`;
    const response = await fetch(endpoint);
    const { board } = await response.json();
    setBoard(board);
    setInput(board);
    setGiveUp(false);
    setLoading(false);
    setTime(0);
    setPaused(false);
  }, []);

  const checkSugoku = async () => {
    setPaused(true);
    setLoading(true);
    const data = { board: input };
    const endpoint = `https://sugoku2.herokuapp.com/validate`;
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
      const finishTime = time;
      const finalScore = scoreCalc(finishTime, route.params.level);
      const playerName = name;
      finishGame(playerName, route.params.level, finishTime, finalScore);
    } else {
      ToastAndroid.show("Incorrect answers! Keep trying!", 2000)
      setPaused(false);
    }
    setLoading(false);
  };

  const solveSugoku = async () => {
    setPaused(true);
    setLoading(true);
    const data = { board };
    const endpoint = `https://sugoku2.herokuapp.com/solve`;
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
    setGiveUp(true); // DISABLE THIS FOR TESTING PURPOSES
    setLoading(false);
    setTime(0); // DISABLE THIS FOR TESTING PURPOSES
  };
  ////////////////////

  const handleInput = (text, i, j) => {
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
    setPaused(true);
    setTime(0);
    setPaused(false);
  };

  const gotoHome = async () => {
    setPaused(true);
    setTime(0);
    await AsyncStorage.removeItem("name");
    navigation.navigate("Home");
  };

  const finishGame =(name, diff, time, score) => {
    const data = { name, diff, time, score }
    if (leaderBoard.length) {
      setLeaderBoard([...leaderBoard, data])
    } else {
      setLeaderBoard([data])
    }
    setTime(0);
    navigation.navigate("Finish");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {fontsReady && (
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
                <Text style={[styles.text]}>Time: {inGameTime(time)}</Text>
                <Text style={[styles.text]}>Level: {route.params.level}</Text>
              </View>
              {input.map((row, i) => (
                <View key={i} style={styles.rowStyle}>
                  {row.map((col, j) => {
                    if (board[i][j]) {
                      return (
                        <TextInput
                          key={j}
                          style={[
                            styles.colStyle,
                            styles.text,
                            styles.apiInput,
                            styles.lightBg,
                            i !== 0 && i % 3 === 0 ? styles.rowBorder : styles.noBorder,
                            j !== 0 && j % 3 === 0 ? styles.colBorder : styles.noBorder,
                          ]}
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
                          style={[
                            styles.colStyle,
                            styles.text,
                            styles.userInput,
                            styles.darkBg,
                            i !== 0 && i % 3 === 0 ? styles.rowBorder : styles.noBorder,
                            j !== 0 && j % 3 === 0 ? styles.colBorder : styles.noBorder,
                          ]}
                          keyboardType="numeric"
                          maxLength={1}
                          editable={!giveUp}
                          onChangeText={(text) => handleInput(text, i, j)}
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
            <>
            {!giveUp && (
              <View style={styles.fixToText}>
                <>
                  <Button
                    title="🏳 GIVE UP"
                    color="grey"
                    onPress={() =>
                      confirm(
                        "GIVING UP?",
                        "Give up and see the solution?",
                        () => solveSugoku()
                      )
                    }
                  />
                  <Button
                    title="🔍 CHECK"
                    color="dodgerblue"
                    onPress={checkSugoku}
                  />
                  <Button
                    title="🔄 RESTART"
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
                  title="🏠 GO TO HOME"
                  color="forestgreen"
                  onPress={() =>
                    confirm(
                      "BACK TO HOME?",
                      "Quit this game and go back to Home?",
                      () => gotoHome()
                    )
                  }
                />
                <Button
                  title="🌟 NEW BOARD"
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
        </ScrollView>
      )}
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
  rowStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 0,
    maxHeight: 36,
  },
  colStyle: {
    borderWidth: .5,
    borderColor: "#000",
    width: 36,
    height: 36,
    fontSize: 24,
  },
  rowBorder: {
    borderTopWidth: 2,
  },
  colBorder: {
    borderLeftWidth: 2,
  },
  noBorder: {},
  lightBg: {
    backgroundColor: "#282c34",
  },
  darkBg: {
    backgroundColor: "#3d4148",
  },
  apiInput: {
    color: "lightsteelblue",
    fontFamily: "kashima",
    fontSize: 36,
  },
  userInput: {
    color: "white",
    fontFamily: "hiroshima",
    fontSize: 24,
  },
  // emptyCell: {
  //   // color: "#444",
  // },
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
