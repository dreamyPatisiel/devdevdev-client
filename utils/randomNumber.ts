export const getRandomNumberOfThree = () => {
  const randomNum = Math.random();
  const randomIndex = Math.floor(Math.floor(randomNum * 10) % 3);

  return randomIndex;
};
