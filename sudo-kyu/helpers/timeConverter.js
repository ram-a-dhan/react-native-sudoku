const convertTime = (time) => {
	time = Number(time);
	let h = Math.floor(time / 3600);
	let m = Math.floor((time % 3600) / 60);
	let s = Math.floor((time % 3600) % 60);
  return { h, m, s }
};

export const inGameTime = (time) => {
	const { h, m, s } = convertTime(time);

	let hDisplay = h > 0 ? h + (h === 1 ? ' hr ' : ' hrs ') : '';
	let mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' mins ') : '';
	let sDisplay = s > 0 ? s + (s === 1 ? ' sec' : ' secs') : '';
	return hDisplay + mDisplay + sDisplay;
};

export const resultTime = (time) => {
	const { h, m, s } = convertTime(time);

	let hDisplay = h > 0 ? h + 'h' : '';
	let mDisplay = m > 0 ? m + 'm' : '';
	let sDisplay = s > 0 ? s + 's' : '';
	return hDisplay + mDisplay + sDisplay;
};
