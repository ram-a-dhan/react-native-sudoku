export const insertionSort = (input) => {
  let result = [...input];
  for (let i = 1; i < result.length; i++) {
    for (let j = i; j >= 1; j--) {
      if (
        result[j].score > result[j-1].score
        || (
          result[j].score === result[j-1].score
          && result[j].time < result[j-1].time
      )) {
        let temp = result[j];
        result[j] = result[j-1];
        result[j-1] = temp;
      }
    }
  }
  return result;
}