import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

export default function App() {

  //// STATE INITIALIZATIONS ////
  const [board, setBoard] = useState([]);
  const [input, setInput] = useState([]);
  const [loading, setLoading] = useState(false);
  ///////////////////////////////

  //// SUGOKU API-RELATED SCRIPTS ////
  const encodeBoard = (board) =>
    board.reduce((result, row, i) =>
      result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '');
  const encodeParams = (params) =>
    Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

  const fetchSugoku = useCallback(
    async () => {
      setLoading(true);
      const endpoint = `https://sugoku.herokuapp.com/board?difficulty=easy`;
      const response = await fetch(endpoint);
      const { board } = await response.json();
      setBoard(board);
      setInput(board);
      setLoading(false);
    }, []
  );
  useEffect(() => {
    fetchSugoku();
  }, []);
  const checkSugoku = async () => {
      setLoading(true);
      const data = { board: input }
      const endpoint = `https://sugoku.herokuapp.com/validate`;
      const options = {
        method: 'POST',
        body: encodeParams(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      };
      const response = await fetch(endpoint, options);
      const { status } = await response.json();
      setLoading(false);
      alert(status);
  }
  const solveSugoku = async () => {
      setLoading(true);
      const data = { board }
      const endpoint = `https://sugoku.herokuapp.com/solve`;
      const options = {
        method: 'POST',
        body: encodeParams(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      };
      const response = await fetch(endpoint, options);
      const { solution } = await response.json();
      setInput(solution);
      setLoading(false);
  }
  ////////////////////////////////////

  //// EVENT HANDLERS ////
  const handleChange = (text, i, j) => {
    let newInput = [], temp = [];
    for (let x = 0; x < input.length; x++) {
      for (let y = 0; y < input[x].length; y++) {
        temp.push(Number(input[x][y]));
      }
      newInput.push(temp);
      temp = [];
    }
    newInput[i][j] = Number(text);
    setInput(newInput);
  }
  const resetSugoku = () => {
    setInput(board);
  }
  ////////////////////////

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={[styles.text, styles.title]}>SUDO-KYU</Text>
        {
          loading && (
            <View style={styles.loadingBox}>
              <Text style={[styles.text, styles.loadingText]}>
                loading
              </Text>
              <Text style={[styles.text, styles.loadingText]}>
                ...
              </Text>
            </View>
          ) || (
            <View>
              {input.map((row, i) => (
                  <View key={i} style={styles.rowStyle}>
                    {row.map((col, j) => {
                      if (board[i][j]) {
                        return (
                          <TextInput
                            key={j}
                            style={[styles.colStyle, styles.text, styles.apiInput]}
                            keyboardType="numeric"
                            maxLength={1}
                            editable={false}
                            defaultValue={ col.toString() }
                          >
                          </TextInput>
                        )
                      } else {
                        return (
                          <TextInput
                            key={j}
                            style={[styles.colStyle, styles.text, styles.userInput]}
                            keyboardType="numeric"
                            maxLength={1}
                            editable={true}
                            onChangeText={ (text) => handleChange(text,i,j)}
                          >
                            {col === 0 ? "" : col}
                          </TextInput>
                        )
                      }
                    })}
                  </View>
              ))}
            </View>

          )
        }
        {
          !loading && (
            <View style={styles.fixToText}>
                <Button
                  title="SOLVE"
                  color="green"
                  onPress={solveSugoku}
                />
                <Button
                  title="CHECK"
                  color=""
                  onPress={checkSugoku}
                />
                <Button
                  title="RESET"
                  color="darkorange"
                  onPress={resetSugoku}
                />
                <Button
                  title="FETCH"
                  color="crimson"
                  onPress={fetchSugoku}
                />
            </View>
          )
        }
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 36,
    margin: 36,
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#888',
    maxHeight: 36,
  },
  colStyle: {
    borderWidth: 1,
    borderColor: '#888',
    width: 36,
    height: 36,
    fontSize: 24,
  },
  apiInput: {
    color: '#61dafb',
    backgroundColor: '#3d4148',
  },
  userInput: {
    backgroundColor: '#24272e',
  },
  emptyCell: {
  color: '#444',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24
  },
  loadingBox: {
    width: 326,
    height: 326,
    borderWidth: 2,
    borderColor: '#888',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 36,
    margin: 0,
  },
});
