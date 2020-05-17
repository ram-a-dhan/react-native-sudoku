import React, {
  useState,
  useEffect,
} from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import * as Font from "expo-font";

export default function Home({ navigation }) {

  const [name, setName] = useState("");
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsReady(true))
  }, []);

  const loadFonts = async () => {
    return await Font.loadAsync({
      kashima: require('../assets/font_kashima.otf'),
      hiroshima: require('../assets/font_hiroshima.otf'),
    })
  }

  const changeName = (text) => {
    setName(text);
  };

  const gotoBoard = async (level) => {
    if (name.length < 3 && name.length > 5) {
      Alert.alert("INVALID NAME!", "Name must be no less than 3 characters & no more than 5 characters!");
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
            style={[styles.nameStyle, styles.text, styles.marBot]}
            onChangeText={(text) => changeName(text)}
            defaultValue={name}
          ></TextInput>
          <Text style={[styles.text]}>SET THE LEVEL:</Text>
          <View style={[styles.fixToText, styles.marBot]}>
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
    fontFamily: "hiroshima",
  },
  warning: {
    color: "crimson",
    textAlign: "center",
  },
  title: {
    fontSize: 60,
    margin: 36,
    fontFamily: "kashima",
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
  nameStyle: {
    borderWidth: 1,
    color: "#61dafb",
    backgroundColor: "#3d4148",
    borderColor: "#888",
    fontSize: 24,
    height: 36,
  },
  marTop: {
    marginTop: 126,
  },
  marBot: {
    marginBottom: 36,
  },
});
