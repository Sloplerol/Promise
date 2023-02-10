const fs = require('fs');
function Myreadfile(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,data)=>{
            if(err) reject(err);
            resolve(data)
        })
    })
}

Myreadfile('./resource/info.txt').then((value)=>{
    console.log(value.toString());
},(reason)=>{
    console.log(reason);
})
