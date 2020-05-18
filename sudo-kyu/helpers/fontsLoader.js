import * as Font from 'expo-font';

export const loadFonts = async () => {
	return await Font.loadAsync({
		kashima: require('../assets/font_kashima.otf'),
		hiroshima: require('../assets/font_hiroshima.otf'),
	});
};
