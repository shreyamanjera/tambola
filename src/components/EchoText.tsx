"use client";

import { CSSProperties, PointerEvent, useMemo, useRef } from "react";
import "./EchoText.css";

type EchoTextProps = {
  text: string;
  echoes?: number;
  lag?: number;
  offset?: number;
  direction?: "right" | "left";
  fade?: number;
  blur?: number;
  tint?: string;
  cursorRadius?: number;
  duration?: number;
  ease?: string;
  fontSize?: string;
  fontWeight?: number;
  color?: string;
};

export default function EchoText({
  text, echoes = 12, lag = 0.24, offset = 36, direction = "right", fade = 0.72,
  blur = 3, tint = "#7dd3fc", cursorRadius = 320, duration = 900,
  ease = "ease-out", fontSize = "inherit", fontWeight = 800, color = "inherit",
}: EchoTextProps) {
  const element = useRef<HTMLSpanElement>(null);
  const echoesList = useMemo(() => Array.from({ length: echoes }, (_, index) => index), [echoes]);
  const move = (event: PointerEvent<HTMLSpanElement>) => {
    const box = element.current?.getBoundingClientRect();
    if (!box || !element.current) return;
    element.current.style.setProperty("--cursor-x", `${event.clientX - box.left}px`);
    element.current.style.setProperty("--cursor-y", `${event.clientY - box.top}px`);
  };
  const style = {
    "--echo-offset": `${offset}px`, "--echo-duration": `${duration}ms`, "--echo-ease": ease,
    "--echo-tint": tint, "--echo-radius": `${cursorRadius}px`, color, fontSize, fontWeight,
  } as CSSProperties;

  return <span ref={element} className="echo-text" style={style} onPointerMove={move}>
    {echoesList.map((index) => {
      const progress = (index + 1) / echoes;
      const sign = direction === "right" ? 1 : -1;
      return <span className="echo-text__echo" aria-hidden="true" key={index} style={{
        transform: `translateX(${sign * progress * offset}px)`, opacity: (1 - progress) * fade,
        filter: `blur(${progress * blur}px)`, transitionDelay: `${index * lag * 100}ms`,
      }}>{text}</span>;
    })}
    <span className="echo-text__echo echo-text__echo--front">{text}</span>
  </span>;
}
