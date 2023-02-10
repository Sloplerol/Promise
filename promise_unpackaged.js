function Promise(excutor) {
    // _this为Promise 
    const _this = this;

    // 用来接收成功和失败的回调
    this.callback = [];

    //初始化
    this.PromiseState = 'pending'
    this.PromiseResult = null;
    // resolve函数 函数的目的是为了去修改改变状态和值
    function resolve(data){

        //将pending状态修改为成功状态 避免成功和失败之间进行转化 但是注意是不等于pending(同时也避免了相同状态的转化) 
        if(_this.PromiseState!=='pending') return;

        // 由于resolve直接调用箭头函数 此时this指向为window
        // console.log(this);

        _this.PromiseState = 'resolved';
        _this.PromiseResult = data;
        //执行成功的回调
        // if(_this.callback.onResolved) {
        //     _this.callback.onResolved(data);
        // }
        // 执行所有回调里成功的回调
        setTimeout(()=>{
            _this.callback.forEach(item=>{
                item.onResolved(data)
            })
        })
        

    }
    // reject函数 
    function reject(data){
        //将pending状态修改为失败状态
        if(_this.PromiseState!=='pending') return;

        _this.PromiseState = 'rejected';
        _this.PromiseResult = data;
        //执行失败的回调
        // if(_this.callback.onRejected) {
        //     _this.callback.onRejected(data);
        // }
        // 执行所有回调里失败的回调
        setTimeout(()=>{
            _this.callback.forEach(item=>{
                item.onRejected(data)
            })
        })
    }

    try {
        // 调用执行器函数
        excutor(resolve,reject);
    } catch (e) {
        // 捕获到一场的同时通过reject函数将状态和值发生修改
        reject(e)
    }
    
}

//添加then方法

Promise.prototype.then = function(onResolved,onRejected){
    // 为了避免出现onRejected和onResolved不是函数的问题 我们需要给undefined的回调定义
    if(typeof onRejected !== 'function') {
        onRejected = function(r) {
            throw(r);
        }
    }
    if(typeof onResolved !== 'function') {
        onResolved = function(v) {
            return v; 
        }
    }
    return new Promise((resolve,reject)=>{
        const _this = this;
        function callback(type){
            try {
                // result拿到的是成功回调返回的结果
            let result = type(_this.PromiseResult);
            if(result instanceof Promise) {
                //如果返回结果为Promisee对象 那么最终状态由该promise决定
                result.then(v=>{
                    resolve(v);
                },r=>{
                    reject(r);
                })

            }else {
                resolve(result);
            }
            } catch (e) {
                reject(e);
            }
        }
        if(this.PromiseState==='resolved') {
            setTimeout(()=>{
                callback(onResolved)
            })
        }
        if(this.PromiseState==='rejected') { 
            setTimeout(()=>{
                callback(onRejected)
            })
        }
        if(this.PromiseState=== 'pending') {
            // 保存回调通过Promise对象传递给执行器函数
            this.callback.push({
                // 针对于多个回调最后一个回调会将之前函数的成功回调和失败回调覆盖掉
                onResolved(){
                    // 将成功的回调进行修改
                    // console.log('hello');

                    callback(onResolved)
                },
                onRejected(){
                    // console.log('Error');

                    callback(onRejected);
                }
            })
        }
    })
    
}


// 添加catch方法
Promise.prototype.catch = function(onRejected) {
    return this.then(undefined,onRejected);
}


Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise) {
            value.then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }else {
            resolve(value)
        }
    })
}

Promise.reject = function(err){
    return new Promise((resolve,reject)=>{
        reject(err);
    })
}


Promise.all = function(promises){
    return new Promise((resolve,reject)=>{
        let count = 0;
        let arr = [];
        for(let i = 0;i<promises.length;i++) {
            promises[i].then(v=>{
                count++;
                arr[i] = v;
                if(count===promises.length) {
                    resolve(arr); 
                }
            },r=>{
                reject(r)
            })
        }
    })
}

Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i = 0;i<promises.length;i++) {
            promises[i].then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }
    })
}