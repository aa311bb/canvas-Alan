let draw = function (ctx, data) {
  ctx.save();

  let drawIndex=0
  drawPath()
  function drawPath(){
    drawIndex++;
    if(drawIndex>data.length){
      lastDraw(data[data.length-1])
      console.log("绘图完成");
    }else if(drawIndex===1){
      fisrtDraw(data[drawIndex-1].fillStyle)
      drawPath()
    }else{
      setTimeout(()=>{
        centreDraw(data[drawIndex-1])
      drawPath()
      },10)
    }
  }
  
};

function fisrtDraw(data) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(609, 0);
  ctx.lineTo(609, 1100);
  ctx.lineTo(0, 1100);
  ctx.closePath();
  ctx.clip();
  ctx.strokeStyle = "rgba(0,0,0,0)";
  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
  ctx.miterLimit = 4;
  ctx.save();
  ctx.save();
  ctx.fillStyle = data;
  ctx.globalAlpha = 1;
}
function centreDraw(data) {
  ctx.beginPath();
  ctx.moveTo(data.moveTo[0], data.moveTo[1]);
  for (let i in data.bezierCurveTo) {
    ctx.bezierCurveTo(
      data.bezierCurveTo[i][0],
      data.bezierCurveTo[i][1],
      data.bezierCurveTo[i][2],
      data.bezierCurveTo[i][3],
      data.bezierCurveTo[i][4],
      data.bezierCurveTo[i][5]
    );
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.restore();
  ctx.save();
  ctx.save();
  ctx.fillStyle = data.fillStyle;
  ctx.globalAlpha = 1;
}
function lastDraw(data) {
  ctx.beginPath();
  ctx.moveTo(data.moveTo[0], data.moveTo[1]);
  for (let i in data.bezierCurveTo) {
    ctx.bezierCurveTo(
      data.bezierCurveTo[i][0],
      data.bezierCurveTo[i][1],
      data.bezierCurveTo[i][2],
      data.bezierCurveTo[i][3],
      data.bezierCurveTo[i][4],
      data.bezierCurveTo[i][5]
    );
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.restore();
  ctx.restore();
}
