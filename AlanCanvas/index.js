var fs = require("fs");

var result = fs.readFileSync("./test.txt");
var test = result.toString();


var positions = new Array();
var pos = test.indexOf("ctx.beginPath();");

while(pos > -1){
	positions.push(pos);
	pos = test.indexOf("ctx.beginPath();",pos + 15);
}
// console.log(positions);
let bezierCurveToArr=new Array()
for(let i=0;i<positions.length;i++){
    let index=test.substring(positions[i],positions[i+1])
    let bezierCurveToIndexArr=new Array()
    let bezierCurveToPos=index.indexOf('ctx.bezierCurveTo')
    let moveToPos=index.indexOf('ctx.moveTo')
    let fillStylePos=index.indexOf('ctx.fillStyle')
    while(bezierCurveToPos>-1){
        bezierCurveToIndexArr.push(bezierCurveToPos)
        bezierCurveToPos=index.indexOf('ctx.bezierCurveTo',bezierCurveToPos+15)
    }
    let bezierCurveTo=[]
    for(let j=0;j<bezierCurveToIndexArr.length;j++){
        bezierCurveTo.push(index.substring(bezierCurveToIndexArr[j],bezierCurveToIndexArr[j+1]).match(/([-|0-9]+\.[0-9])[0-9]*/g))
    }
    bezierCurveToArr.push({
        moveTo:index.substring(moveToPos,moveToPos+35).match(/([-|0-9]+\.[0-9])[0-9]*/g),
        fillStyle:index.substring(fillStylePos+17,fillStylePos+24),
        bezierCurveTo:bezierCurveTo
    })
}
console.log("准备写入文件");
fs.writeFile('data.js', `let data=${JSON.stringify(bezierCurveToArr)}`,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
});





