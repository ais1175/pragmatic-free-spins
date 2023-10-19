const { getNewBalance } = require('./utils');

const gameState = {
  index: 1,
  counter: 1,
  balance: 0,
};

const setBalance = async (data: string) => {
  const balance = getNewBalance(data);
  gameState.balance = balance;
};

const incrementGame = () => {
  gameState.index += 1;
  gameState.counter += 2;
};

module.exports = {
  setBalance,
  incrementGame,
  gameState,
};
