const axios = require('axios');

const startSession = async (): Promise<string> => {
  const url =
    'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vswaysraghex&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&jurisdiction=99&lobby_url=https%3A%2F%2Fwww.pragmaticplay.com%2Fen%2F&lang=EN&cur=CAD';

  const { request } = await axios.get(url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en-US,en;q=0.9',
      'sec-ch-ua':
        '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'iframe',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'cross-site',
      'upgrade-insecure-requests': '1',
      Referer: 'https://www.pragmaticplay.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });

  const sessionUrl = request.res.responseUrl;
  const sessionKey = sessionUrl.split('&mgckey=')[1];

  return sessionKey;
};

module.exports = startSession;
