export const getRandomIndex = (max: number) => {
  const randomNum = Math.random();
  const randomIndex = Math.floor(Math.floor(randomNum * 10) % max);

  return randomIndex;
};
