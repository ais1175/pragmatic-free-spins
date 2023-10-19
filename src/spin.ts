const axios = require('axios');
const logger = require('node-color-log');

const { BASE_URL, TIMES_TO_SPIN } = require('./config');
const { getWin, getTotalWin } = require('./utils');
const startSession = require('./startSession');
const headers = require('./headers');

const gameValues = {
  index: 1,
  counter: 1,
};

const incrementGameValues = () => {
  gameValues.index += 1;
  gameValues.counter += 2;
};

(async () => {
  const sessionKey = await startSession();
  logger.success(`Started new session: ${sessionKey}`);

  const loadGame = async () => {
    return axios.post(
      BASE_URL,
      `action=doInit&symbol=vswaysraghex&cver=150039&index=1&counter=1&repeat=0&mgckey=${sessionKey}`,
      {
        headers,
      },
    );
  };

  const spin = async () => {
    incrementGameValues();
    const { data } = await axios.post(
      BASE_URL,
      `action=doSpin&symbol=vswaysraghex&c=0.1&l=20&bl=0&index=${gameValues.index}&counter=${gameValues.counter}&repeat=0&mgckey=${sessionKey}`,
      {
        headers,
      },
    );

    return {
      isFreeSpinsCompleted: data.includes('fs_total='),
      isFreeSpin: data.includes('fsmax'),
      win: getWin(data),
      totalWin: getTotalWin(data),
    };
  };

  const collect = () => {
    incrementGameValues();
    return axios.post(
      BASE_URL,
      `symbol=vswaysraghex&action=doCollect&index=${gameValues.index}&counter=${gameValues.counter}&repeat=0&mgckey=${sessionKey}`,
      {
        headers,
      },
    );
  };

  await loadGame();

  for (let i = 0; i < TIMES_TO_SPIN; i++) {
    const { isFreeSpinsCompleted, isFreeSpin, win, totalWin } = await spin();

    if (isFreeSpinsCompleted) {
      logger.info(`Free Spins - Won $${totalWin}`);
      await collect();
    } else {
      logger.info(`Spin ${i + 1} - $${win.toFixed(2)}`);

      if (win > 0 && !isFreeSpin) {
        await collect();
        logger.success(`Collected - $${win.toFixed(2)}`);
      }
    }
  }
})();
