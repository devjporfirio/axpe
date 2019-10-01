export const suffle = list => {
  return list.sort(() => Math.random() - 0.5);
};
