const fs = require('fs');

const util = require('util');

const Myfile = util.promisify(fs.readFile);

async function fn(){
    try {
        let data1 = await Myfile('./resource/info.txt');
        let data2 = await Myfile('./resource/info1.txt');
        console.log(data1 + data2);
    } catch (e) {
        console.log(e);
    }
}

fn()