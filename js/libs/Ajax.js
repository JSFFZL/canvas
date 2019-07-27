

/**
 * 
 * @param {type} 请求类型：get / post  
 * @param {url} 请求地址： 接口地址 、 文件（json,xml,文本）
 * @param {isAsync}  请求是否异步：true 异步 / false 同步
 * @param {callback} 回调函数：  
 */
function Ajax(type,url,isAsync,callback){

     // 第一步：创建 XMLHttpRequest 对象
     var xhr = new XMLHttpRequest();

     // 第二步： 创建请求：open
     xhr.open(type, url, isAsync);

     // 第三步： 注册监听器：onreadystatechange
     xhr.onreadystatechange = function () {
         if (xhr.readyState == 4 && xhr.status == 200) {
             // 可以接受响应回来的数据
             // responseText 表示服务器响应回来的文本/
             var resText = JSON.parse(xhr.responseText);

             callback && callback(resText);
         }
     }
     // 第四步： 发送请求：send
     xhr.send(null);
}