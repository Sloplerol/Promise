// const XMLHttpRequest = require('xmlhttprequest');
// function sendAJAX(url){
//     return new Promise((resolve,reject)=>{
//         const xhr = new XMLHttpRequest();
        // xhr.readyState = 'json';
//         // json将响应类型转化为了对象类型并返回
//         xhr.open('GET',url);
//         xhr.send();
//         xhr.onreadystatechange = function(){
//         if(xhr.readyState===4) {
//             if(xhr.status>=200 && xhr.status<300) {
//                 resolve(xhr.response);
//             }else {
//                 reject(xhr.status);
//             }
//         }
//     }
//     })
    
// }
// sendAJAX('https://api.uixsj.cn/hitokoto/get?type=social').then((value)=>{ 
//     console.log(value.toString());
// },(reason)=>{
//     console.log(reason);
// })
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function sendAJAX(url){
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        // xhr.readyState = 'json';
        xhr.open('GET',url);
        xhr.send();
        xhr.onreadystatechange = function(){
        if(xhr.readyState===4) {
            if(xhr.status>=200 && xhr.status<300) {
                resolve(xhr.response); 
            }else {
                reject(xhr.status);
            }
        }
    }
    })
}
sendAJAX('https://api.uixsj.cn/hitokoto/get?type=social').then(value=>{
    console.log(value);
},reason=>{
    console.log(reason);
})