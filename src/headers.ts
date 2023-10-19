const { GAME_SYMBOL } = require('./config');

module.exports = {
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9',
  'content-type': 'application/x-www-form-urlencoded',
  'sec-ch-ua':
    '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  Referer: `https://demogamesfree.pragmaticplay.net/gs2c/html5Game.do?extGame=1&symbol=${GAME_SYMBOL}&gname=Tundra%27s%20Fortune&jurisdictionID=99&mgckey=stylename@generic~SESSION@47c0b4a9-35e0-43f7-894d-dca8aef8cfd7`,
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};
