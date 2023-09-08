const puppeteer = require('puppeteer');
const fs = require("fs/promises");


async function setProxy(host, port, username, pw) {

    const proxyHost = host;
    const proxyPort = port;
    const proxyUsername = username;
    const proxyPassword = pw;

    // launch browser using proxy
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--proxy-server=${proxyHost}:${proxyPort}`,
        `--proxy-bypass-list=<-loopback>`,
      ],
  });
  
  // creates a new page instance
  const page = await browser.newPage()

  // Provide authentication credentials
  await page.authenticate({ username: proxyUsername, password: proxyPassword });

  return {page,browser};

}

module.exports = setProxy;
