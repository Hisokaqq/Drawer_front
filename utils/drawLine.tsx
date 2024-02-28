

type DrawLineProps = Draw &  {
    ctx: CanvasRenderingContext2D,
    color: string,
    lineWidth: number
}

export const drawLine = ({ctx, currentPoint, prevPoint, color, lineWidth}: DrawLineProps)=>{
    const {x: currX, y: currY} = currentPoint;
    let startPoint = prevPoint ?? currentPoint
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = color
  ctx.moveTo(startPoint.x, startPoint.y)
  ctx.lineTo(currX, currY)
  ctx.stroke()

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(startPoint.x, startPoint.y, lineWidth/2, 0, 2 * Math.PI)
  ctx.fill()
}