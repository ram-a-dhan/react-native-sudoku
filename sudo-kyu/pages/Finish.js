import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { resultTime } from "../helpers/timeConverter.js";

export default function Home({ navigation, leaderBoard }) {
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
                          <Text style={styles.text, styles.textLeft}>{data.name}</Text>
                          <Text style={styles.text, styles.textRight}>{Math.trunc(data.score)}</Text>
                          <Text style={styles.text, styles.textRight}>{resultTime(data.time)}</Text>
                          <Text style={styles.text, styles.textRight}>{data.diff === 'medium' ? 'med' : data.diff}</Text>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </>
        )}
        <View style={[styles.marBot, styles.marTop]}>
          <Button title="NEW GAME" color="green" onPress={gotoHome} />
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
