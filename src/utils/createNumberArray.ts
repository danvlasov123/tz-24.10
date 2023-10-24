export const createNumberArray = (
  startNumber: number,
  endNumber: number
): number[] => {
  const numberArray = [];
  for (let i = startNumber; i <= endNumber; i++) {
    numberArray.push(i);
  }
  return numberArray;
};
