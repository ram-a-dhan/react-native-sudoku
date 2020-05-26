import React, {
  useState,
  useEffect,
} from "react";
import {
  AsyncStorage,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  BackHandler,
} from "react-native";
import { styles } from "../assets/styles";
import { loadFonts } from "../helpers/fontsLoader";
import { backMinimize } from "../hooks/backMinimize";

export default function Home({ navigation }) {
  backMinimize();

  const [name, setName] = useState("");
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsReady(true));
  }, []);

  const changeName = (text) => {
    setName(text);
  };

  const gotoBoard = async (level) => {
    if (name.length < 3 || name.length > 5 || !(/[A-Z0-9]/gi).test(name)) {
      Alert.alert(
        "INVALID NAME!",
        `- must be 3-5 chars long!\n- must contain only A-Z & 0-9!`
      );
    } else {
      await AsyncStorage.setItem("name", name);
      setName("");
      navigation.navigate("Board", { level });
    }
  };

  const gotoLeaderBoard = () => {
    navigation.navigate("Finish");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      {fontsReady && (
        <ScrollView>
          <Text style={[styles.text, styles.homeMarTop, styles.title]}>SUDO-KYU</Text>
          <Text style={[styles.text, styles.marBot]}>ENTER YOUR NAME:</Text>
          <TextInput
            style={[styles.nameInput, styles.text, styles.marBot]}
            onChangeText={(text) => changeName(text)}
            defaultValue={name}
          ></TextInput>
          <Text style={[styles.text]}>SET THE LEVEL:</Text>
          <View style={[styles.viewDiv, styles.marBot]}>
            <Button
              title="👨 EASY"
              color="#52545C"
              onPress={() => gotoBoard("easy")}
            />
            <Button
              title="🤖 MEDIUM"
              color="#52545C"
              onPress={() => gotoBoard("medium")}
            />
            <Button
              title="👾 HARD"
              color="#52545C"
              onPress={() => gotoBoard("hard")}
            />
          </View>
          <View style={styles.viewDiv}>
            <Button
              title="🏆 SEE LEADERBOARD"
              color="#52545C"
              onPress={() => gotoLeaderBoard()}
            />
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
