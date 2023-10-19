const logger = require('node-color-log');

const { TIMES_TO_SPIN } = require('./config');
const { gameState } = require('./gameState');
const startSession = require('./startSession');

(async () => {
  const { loadGame, spin, collect } = await startSession();

  await loadGame();

  setInterval(() => {
    logger.info(`Current Balance - $${gameState.balance}`);
  }, 60000);

  for (let i = 0; i < TIMES_TO_SPIN; i++) {
    const { isFreeSpinsCompleted, isFreeSpin, win, totalWin } = await spin();

    if (isFreeSpinsCompleted) {
      logger.info(`Free Spins - Won $${totalWin}`);
      await collect();
      continue;
    }

    logger.info(`Spin ${i + 1} - $${win.toFixed(2)}`);

    if (win > 0 && !isFreeSpin) {
      await collect();
      logger.info(`Collected - $${win.toFixed(2)}`);
    }
  }
  process.exit();
})();
