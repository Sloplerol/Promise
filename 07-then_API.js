const p = new Promise((resolve,reject)=>{
    reject('Appear Error')
})

// catch是用来捕获错误的回调的
p.catch((reason)=>{
    console.log(reason);
})

