Promise支持链式调用 可以解决回调地狱问题

Promise的应用场景
    定时器
    AJAX请求
    fs读取文件
    数据库操作
    等等

Promise对象身上挂载属性

# PromiseState Promise对象状态
* pending 未决定
* resolve/fullfilled 成功
* reject 失败
**只可能从pending->resolve或pending->reject**

# PromiseResult 保存着Promise成功或失败返回的值
* resolve
* reject


