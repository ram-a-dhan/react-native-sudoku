import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
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
      <ScrollView>
        {(!leaderBoard &&
          <>
            <ActivityIndicator size="large" color="lightsteelblue" />
          </>
        ) || (
              <>
                <Text style={[styles.text, styles.title]}>LEADERBOARD</Text>
                {!leaderBoard.length && (
                  <View style={[{height:416}, {flex:1, justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={[styles.text, {fontSize: 18}]}>There's no one here...</Text>
                    <Text style={[styles.text, {fontSize: 18, marginBottom:78}]}>Be the first!</Text>
                  </View>
                ) || (
                  <>
                    <View style={[styles.tableRow, styles.padVert, styles.lightBg]}>
                      <View style={styles.tableCell}>
                        <Text style={[styles.text, styles.tableText]}>Name</Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text style={[styles.text, styles.tableText]}>Score</Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text style={[styles.text, styles.tableText]}>Time</Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text style={[styles.text, styles.tableText]}>Level</Text>
                      </View>
                    </View>
                    <View style={{height: 356 }}>
                      <ScrollView>
                        {
                          leaderBoard.map((data, idx) => {
                            return(
                              <View key={idx} style={[styles.tableRow, styles.padVert, idx%2 && styles.medBg]}>
                                <View style={styles.tableCell}>
                                  <Text style={[styles.text, styles.tableText]}>
                                    {idx+1 === 1 ? '🥇': idx+1 === 2 ? '🥈' : idx+1 === 3 ? '🥉' : ''}
                                    {data.name}
                                  </Text>
                                </View>
                                <View style={styles.tableCell}>
                                  <Text style={[styles.text, styles.tableText]}>{Math.trunc(data.score)}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                  <Text style={[styles.text, styles.tableText]}>{resultTime(data.time)}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                  <Text style={[styles.text, styles.tableText]}>{data.diff === 'medium' ? 'med' : data.diff}</Text>
                                </View>
                              </View>
                            )
                          })
                        }
                      </ScrollView>
                    </View>
                  </>
                )}
              </>
        )}
        <View style={[styles.padVert, styles.bottomBar]}>
          <Button title="🏠 HOME" color="#52545C" onPress={() => gotoHome()} />
          <Button title="🔄 RESET" color="#52545C" onPress={() => resetLeaderBoard()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#282c34',
	},
	text: {
		color: 'white',
		textAlign: 'center',
		fontFamily: 'hiroshima',
		letterSpacing: 2,
  },
  tableText: {
    fontSize: 18,
  },
	title: {
		fontSize: 57,
		margin: 36,
		fontFamily: 'kashima',
	},
	padVert: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 18,
  },
  marTop: {
    marginTop: 36,
  },
  marBot: {
    marginBottom: 36,
  },
  bottomBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "flex-end",
  },
  tableBody: {
    flex: 1,
    alignItems: 'flex-start',
  },
  tableRow: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    alignSelf: 'stretch',
    height:24,
  },
  lightBg: {
    backgroundColor: "#3d4148",
  },
  medBg: {
    backgroundColor: '#33373E',
  },
});
