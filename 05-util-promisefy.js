const fs = require('fs');

const util = require('util');
// 返回结果为一个函数 该函数的返回结果为一个promise对象
let Myreadfile = util.promisify(fs.readFile);

Myreadfile('./resource/info.txt').then((value)=>{
    console.log(value.toString());
},(reason)=>{
    console.log(reason); 
})