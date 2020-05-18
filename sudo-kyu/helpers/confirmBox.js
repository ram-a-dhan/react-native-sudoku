import { Alert } from "react-native";

export const confirm = (title, message, action) => {
  Alert.alert(title, message, [
    { text: "YES", onPress: action },
    { text: "NO", style: "cancel" },
  ]);
};