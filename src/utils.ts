const getWin = (data: string): number => {
  return Number(data.split('&w=')[1]);
};

const getTotalWin = (data: string): number => {
  const regex = /tw=([^&]+)/;
  const matched = data.match(regex);
  if (matched) {
    return Number(matched[1]);
  }
  throw new Error('Could not find total win');
};

const getNewBalance = (data: string): number => {
  const regex = /balance=([^&]+)/;
  const matched = data.match(regex);
  if (matched) {
    return Number(matched[1].replace(',', ''));
  }
  throw new Error('Could not get balance');
};

module.exports = {
  getWin,
  getTotalWin,
  getNewBalance,
};
