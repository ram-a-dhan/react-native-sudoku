export const scoreCalc = (playTime, difficulty) => {
  const maxTime = 3600000;
  const constant = 10810.81081081081;
  let baseScore = ((maxTime - playTime) / constant);
  if (difficulty === 'hard') {
    return 3 * baseScore;
  } else if (difficulty === 'medium') {
    return 2 * baseScore;
  } else {
    return baseScore;
  }
}