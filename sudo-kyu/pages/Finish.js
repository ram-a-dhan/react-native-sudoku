import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { resultTime } from "../helpers/timeConverter.js";

export default function Home({ navigation, leaderBoard, setLeaderBoard }) {

  const gotoHome = async () => {
    navigation.navigate("Home");
  };

  const resetLeaderBoard = () => {
    setLeaderBoard([]);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        {(!leaderBoard &&
          <>
            <Text style={[styles.text, styles.loadingText]}>Loading</Text>
            <Text style={[styles.text, styles.loadingText]}>...</Text>
          </>
        ) || (!leaderBoard.length &&
          <>
          </>
        ) || (
              <>
                <Text style={[styles.text, styles.title]}>LEADERBOARD</Text>
                <View style={[styles.tableRow, styles.fixToText]}>
                  <View style={styles.tableCell}>
                    <Text style={[styles.text, styles.textBold]}>Name</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.text, styles.textBold]}>Score</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.text, styles.textBold]}>Time</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.text, styles.textBold]}>Level</Text>
                  </View>
                </View>
                <ScrollView contentContainerStyle={styles.tableBody}>
                  {
                    leaderBoard.map((data, idx) => {
                      return(
                        <View key={idx} style={[styles.tableRow, styles.fixToText]}>
                          <View style={styles.tableCell}>
                            <Text style={styles.text}>{data.name}</Text>
                          </View>
                          <View style={styles.tableCell}>
                            <Text style={styles.text}>{Math.trunc(data.score)}</Text>
                          </View>
                          <View style={styles.tableCell}>
                            <Text style={styles.text}>{resultTime(data.time)}</Text>
                          </View>
                          <View style={styles.tableCell}>
                            <Text style={styles.text}>{data.diff === 'medium' ? 'med' : data.diff}</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </>
        )}
        <View style={styles.bottomBar}>
          <Button title="NEW GAME" color="green" onPress={gotoHome} />
          <Button title="RESET" color="crimson" onPress={resetLeaderBoard} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#282c34",
  },
  text: {
    color: "white",
    textAlign: "center",
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
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginTop: 24,
  },
  tableBody: {
    flex: 1,
    alignItems: 'flex-start'
  },
  tableRow: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    alignSelf: 'stretch',
  }
});
