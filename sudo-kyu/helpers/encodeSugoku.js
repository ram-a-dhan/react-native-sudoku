const encodeBoard = (board) =>
	board.reduce(
		(result, row, i) =>
			result +
			`%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
		''
	);
export const encodeParams = (params) =>
	Object.keys(params)
		.map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
		.join('&');