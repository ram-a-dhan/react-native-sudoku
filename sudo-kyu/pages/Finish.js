import React, { useEffect } from "react";
import {
  Text,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { insertionSort } from "../helpers/insertionSort";
import { resultTime } from "../helpers/timeConverter.js";
import { styles } from "../assets/styles";
import { confirm } from "../helpers/confirmBox";
import { backMinimize } from "../hooks/backMinimize";

export default function Home({ navigation, leaderBoard, setLeaderBoard }) {
  backMinimize();

  useEffect(() => {
    if (leaderBoard && leaderBoard.length > 1) {
      setLeaderBoard(insertionSort(leaderBoard));
      if (leaderBoard.length > 10) setLeaderBoard(leaderBoard.slice(0, 10));
    }
  }, [])

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
            <Text style={[styles.text, styles.finishTitle]}>LEADERBOARD</Text>
            {!leaderBoard.length && (
              <View style={styles.emptyViewDiv}>
                <Text style={[styles.text]}>THERE'S NO ONE HERE...</Text>
                <Text style={[styles.text, styles.emptyMarBot]}>BE THE FIRST!</Text>
              </View>
            ) || (
              <>
                <View style={[styles.tableRow, styles.padVert, styles.lightBg]}>
                  <View style={styles.tableCell}>
                    <Text style={[styles.text, styles.tableText]}>NAME</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.text, styles.tableText]}>SCORE</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.text, styles.tableText]}>TIME</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.text, styles.tableText]}>LEVEL</Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
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
                              <Text style={[styles.text, styles.tableText]}>
                                {Math.trunc(data.score)}
                              </Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text style={[styles.text, styles.tableText]}>
                                {resultTime(data.time)}
                              </Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text style={[styles.text, styles.tableText]}>
                                {data.diff === 'medium' ? 'med' : data.diff}
                              </Text>
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
          <Button
            title="🏠 HOME"
            color="#52545C"
            onPress={() => gotoHome()}
          />
          <Button
            title="🔄 RESET"
            color="#52545C"
            onPress={() =>
              confirm(
                "RESET LEADERBOARD?",
                "Erase all leaderboard entries?",
                () => resetLeaderBoard()
              )}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
