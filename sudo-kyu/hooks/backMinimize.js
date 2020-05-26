import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const backMinimize = () => {
	const backAction = () => {
		BackHandler.exitApp();
		return true;
	};

	useEffect(() => {
		BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
		return () =>
			BackHandler.removeEventListener(
        'hardwareBackPress',
        backAction
      );
	}, []);
};
