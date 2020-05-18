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
} from "react-native";
import { styles } from "../assets/styles";
import { loadFonts } from "../helpers/fontsLoader";

export default function Home({ navigation }) {

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

  return (
    <KeyboardAvoidingView style={styles.containerHome}>
      {fontsReady && (
        <ScrollView>
          <Text style={[styles.text, styles.marTop, styles.title]}>SUDO-KYU</Text>
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
              color="forestgreen"
              onPress={() => gotoBoard("easy")}
            />
            <Button
              title="🤖 MEDIUM"
              color="dodgerblue"
              onPress={() => gotoBoard("medium")}
            />
            <Button
              title="👽 HARD"
              color="crimson"
              onPress={() => gotoBoard("hard")}
            />
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
