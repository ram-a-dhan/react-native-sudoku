import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	//// HOME ////
	containerHome: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
	viewDiv: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingVertical: 24,
	},
	nameInput: {
		borderWidth: 0,
		color: '#61dafb',
		borderRadius: 10,
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
});
