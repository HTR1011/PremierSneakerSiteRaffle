const { log } = require('console');
const fs = require('fs/promises');


//Create a function that read proxy list and split out each of them
async function readProxy(filename){
    //take 1 arg for filename, then read it as 'utf8' format (basically ABC char format)
    try{
        // read proxy txt file
        const data = await fs.readFile( __dirname + '/resources/' + filename + '.txt', 'utf8');

        //first split out each line.
        const lines = data.split('\r\n');

        // list of all of proxies
        const proxyList = [];

        //run a loop to split out each line and assign them by order
        for (const line of lines){
            const [proxyHost, proxyPort, proxyUsername, proxyPassword] = line.split(':');
            // console.log('Proxy:', proxyHost, proxyPort, proxyUsername, proxyPassword);
            const proxyObject = {
                proxyHost, 
                proxyPort, 
                proxyUsername, 
                proxyPassword,
            }
            proxyList.push(proxyObject);
        }

        return proxyList;

        //if there are any error
    } catch(err){
        log("Error at ", err);
        return null;
    }
}


module.exports = readProxy;
