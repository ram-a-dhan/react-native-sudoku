import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	//// GLOBAL ////
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#282c34',
	},
	text: {
		color: 'white',
		textAlign: 'center',
		fontFamily: 'hiroshima',
		letterSpacing: 2,
	},
	title: {
		fontSize: 60,
		margin: 36,
		fontFamily: 'kashima',
	},
	////////////////

	//// HOME ////
	viewDiv: {
		flex: 1,
		flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignContent: 'space-between',
		paddingVertical: 24,
	},
	nameInput: {
		borderWidth: 0,
		color: 'white',
		borderRadius: 3,
		backgroundColor: '#3d4148',
		fontSize: 24,
		height: 36,
	},
	marTop: {
		marginTop: 126,
	},
	marBot: {
		marginBottom: 36,
	},
	//////////////

	//// BOARD ////
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
    borderRadius: 3,
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
    backgroundColor: "#3d4148",
  },
  darkBg: {
    backgroundColor: "#282c34",
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
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginTop: 24,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  topBarLoading: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 6,
  },
  loadingBox: {
    width: 324,
    height: 324,
    borderWidth: 0,
    borderColor: "#888",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 36,
    margin: 0,
  },
	///////////////
});
