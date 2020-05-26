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
	marTop: {
		marginTop: 36,
	},
	marBot: {
		marginBottom: 36,
	},
  lightBg: {
    backgroundColor: "#3d4148",
  },
  medBg: {
    backgroundColor: '#33373E',
  },
  darkBg: {
    backgroundColor: "#282c34",
  },
  padVert: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 18,
  },
  bottomBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "flex-end",
    marginTop:24
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
	homeMarTop: {
		marginTop: 126,
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
  ///////////////

  //// FINISH ////
  finishTitle: {
    fontSize: 57,
		margin: 36,
		fontFamily: 'kashima',
  },
  emptyViewDiv: {
    height:416,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyFont: {
    fontSize: 18,
  },
  emptyMarBot: {
    marginBottom: 78,
  },
  tableText: {
    fontSize: 18,
  },
  tableBody: {
    height: 300
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
  ////////////////
});
