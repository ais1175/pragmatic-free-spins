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

module.exports = {
  getWin,
  getTotalWin,
}