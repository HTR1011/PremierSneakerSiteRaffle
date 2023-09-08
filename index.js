const puppeteer = require('puppeteer');
const fs = require("fs/promises");
const setProxy = require("./setProxy")
const Register = require("./Register")
const Login = require("./login")
const readProxy = require("./readProxy")
const readUserPw = require("./readUserPw")
const readline = require("readline")

// delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// readline function
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// main function
async function start() {
  // prompt user for input
  rl.question('What would you like to do? \n1-Register \n2-Login\n', (option) => {
    // switch statement for tasks
    switch (option) {
      case '1':
        console.log('Register function');
        // Register function --> number of tasks = number of proxy
        (async () => {
          const proxyList = await readProxy("proxy")
          console.log(proxyList)

          for (const proxy of proxyList) {
            const { page, browser } = await setProxy(proxy.proxyHost, proxy.proxyPort, proxy.proxyUsername, proxy.proxyPassword);
            await Register(page);
            await browser.close()
          }
          
        })();
        break;
      
      case '2':
        console.log('Log in function');
        // Login function --> number of tasks = number of accounts
        (async () => {
          const userInfo = await readUserPw("account");
          console.log(userInfo);
          const proxyList = await readProxy("proxy")
          console.log(proxyList)
          
          // rotate proxy
          let index = 0;
          for (const user of userInfo) {
            const { page, browser } = await setProxy(proxyList[index].proxyHost, proxyList[index].proxyPort, proxyList[index].proxyUsername, proxyList[index].proxyPassword);
            await Login(page, user.username, user.password);
            await browser.close()
            index++;
          }
        })();

        break;
      
      default:
        console.log('Invalid option');
        break;
    }
    rl.close();
  });
}


start();
