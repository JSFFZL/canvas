
var myMain = new BScroll(".main", {
    probeType: 2,
    click:true
})

var pullDown = document.querySelector(".pullDown");
var pullUp = document.querySelector(".pullUp");
var pH = pullDown.offsetHeight;

// 下拉刷新开关
var offDown;
// 上拉加载开关
var offUp;

var isOff = false;

// 注册滚动事件
myMain.on("scroll", function () {
    if (myMain.y > pH) {
        pullDown.innerHTML = "释放刷新";
        offDown = true;
    } else {
        pullDown.innerHTML = "下拉刷新";
        offDown = false;
    }

    if (!isOff) {
        if ((myMain.maxScrollY - pH) > myMain.y) {
            pullUp.innerHTML = "释放加载";
            offUp = true;
        } else {
            pullUp.innerHTML = "上拉加载";
            offUp = false;
        }
    }

})

// 注册滚动结束事件
// 通过全局的开关判断刷新和加载
myMain.on("scrollEnd", function () {
    if (offDown) {
        // 刷新
        location.reload();
        // location = location;
        // history.go(0)
    }
    if (offUp) {
        // 加载
        // console.log("加载");
        getData();
    }
})


// 明星
// 横向滚动
var ps = document.querySelectorAll(".star p");
var sum = 0;
ps.forEach(function (item) {
    sum += item.offsetWidth;
})
document.querySelector(".inner-star").style.width = sum + "px";


var myStar = new BScroll(".star", {
    scrollX: true,
    click:true
})


// 上拉加载的起始索引
var index = 0;
// 初始加载一次ajax
getData();
function getData() {
    Ajax("get", "data/data.json", true, function (res) {
        var newData = res.data1.splice(index, 3);

        if (newData.length > 0) {
            var str = "";
            newData.forEach(function (item) {
                str += `<div class="item">
                <div class="left">
                   <div class="h2">${item.name}</div>
                   <p>年化收益：8%</p>
                   <p>融资金额：${item.productType}</p>
                   <p>期限：${item.month}月</p>
                </div>
                <div class="right"><canvas class="mycanvas" width="200" height="200" id-sc="${item.productType}" ></canvas></div>
            </div>`
            });
            document.querySelector(".lis").innerHTML += str;

            // 更新DOM结构
            myMain.refresh();

            index += 3;
            // 画圆
            canvas();
        } else {
            isOff = true;
            pullUp.innerHTML = "没有数据了";
        }

    })
}

function canvas(){
    // 获取页面渲染后所有的canvas 标签
    var c = document.querySelectorAll(".mycanvas");
    // 循环画圆环
    c.forEach(function(item){
        // 给每个canvas 元素获取绘制上下文
        var context = item.getContext('2d');
        // 获取canvas 上的数据
        var deg = item.getAttribute("id-sc");
        
        // 灰 底色
        context.beginPath();
        context.save();
        context.translate(100, 100);
        context.lineWidth=10;
        context.strokeStyle='#eee';
        context.arc(0, 0, 90, Math.PI / 180 * 0, Math.PI / 180 * 360);
        context.stroke();
        context.restore();
        context.closePath();
        
        // 红色 
        context.beginPath();
        context.save();
        context.translate(100, 100);
        context.lineWidth=10;
        context.strokeStyle='red';
        // 旋转-90d度，从上面位置开始，默认顺时针开始画
        context.rotate(Math.PI / 180 * -90);
        // 开始角度 数据的结束角度
        context.arc(0, 0, 90, Math.PI / 180 * 0, Math.PI / 180 * (deg / 100 * 360) );
        context.stroke();
        context.restore();
        context.closePath();

        // 文字
        context.beginPath();
        context.save();
        context.translate(100, 100);
        context.font='40px sans-serif';
        // 文字水平
        context.textAlign='center';
        // 文字垂直
        context.textBaseline='middle';
        // 把当前数据显示出来,当前数据就是百分比
        context.fillText(deg + "%", 0, 0);
        context.stroke();
        context.restore();
        context.closePath();
    })


}








// function canvas() {
//     // 获取canvas 元素
//     var c = document.querySelectorAll(".mycanvas");
//     // 获取canvas 上的数据
//     c.forEach(function (item) {
//         console.log(item);
//         var idData = item.getAttribute("id-sc");

//         var context = item.getContext("2d");
//         // 灰圈
//         context.beginPath();
//         context.save();
//         context.strokeStyle = '#eee';
//         context.lineWidth = 10;
//         context.translate(100, 100);
//         context.arc(0, 0, 90, Math.PI / 180 * 0, Math.PI / 180 * 360);
//         context.stroke();
//         context.restore();
//         context.closePath();
//         // // 红色圆
//         context.beginPath();
//         context.save();
//         context.strokeStyle = 'red';
//         context.lineWidth = 10;
//         context.textAlign = 'center';
//         context.translate(100, 100);
//         context.arc(0, 0, 90, Math.PI / 180 * 0, Math.PI / 180 * (idData / 100 * 360));
//         context.font = '40px sans-serif';
//         context.fillText(idData + "%", 0, 0);
//         context.stroke();
//         context.restore();
//         context.closePath();
//     })
// }




