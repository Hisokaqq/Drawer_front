"use client"
import { useDraw } from "@/hooks/useDraw";
import { drawLine } from "@/utils/drawLine";
import {  useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SERVER_PORT as string);



type DrawLineProps = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
  lineWidth: number;
};

export default function Home() {
  const [color, setColor] = useState<string>("#000")
  const [lineWidth, setLineWidth] = useState<number>(5)
  const { canvasRef, onMouseDown, clear } = useDraw(createLine );
 
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.emit('client-ready')

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return
      console.log('sending canvas state')
      socket.emit('canvas-state', canvasRef.current.toDataURL())
    })

    socket.on('canvas-state-from-server', (state: string) => {
      console.log('I received the state')
      const img = new Image()
      img.src = state
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on("draw-line", ({prevPoint, currentPoint, color, lineWidth}: DrawLineProps)=>{
      if(!ctx) return;
      drawLine({ctx, currentPoint, prevPoint, color, lineWidth});
      socket.on("clear", clear);
    });

    return () => {
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("draw-line");
      socket.off("clear");
    }
  },[canvasRef]);

  function createLine({prevPoint, currentPoint, ctx,}: Draw){
    socket.emit("draw-line", {prevPoint, currentPoint,color, lineWidth});
    drawLine({ctx, currentPoint, prevPoint, color, lineWidth});
  }
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'r') {
        event.preventDefault();
        clear();
        console.log("clearing");
        socket.emit("clear");
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ ]);

  return (
    <div className="h-[100vh] w-[100%] flex  items-center justify-center">
      <div className="space-y-6 p-12 ">
        <HexColorPicker color={color} onChange={setColor} />
        <input
          id="lineWidth"
          type="range"
          min="1"
          max="20"
          step="0.01"
          value={lineWidth}
          onChange={(e) => setLineWidth(parseFloat(e.target.value))}
          className="w-full h-2 bg-black rounded-lg cursor-pointer appearance-none dark:bg-gray-700"/>
        <div className="space-y-2">
        <p onClick={()=>{socket.emit("clear"); clear()}} className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>R
          </kbd>
          {" "}to clear all
        </p>
        </div>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={800}
        height={800}
        className="border border-black rounded-md"
      />
    </div>
  );
}
