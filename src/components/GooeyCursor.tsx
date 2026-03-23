"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AMOUNT = 20;

export default function GooeyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check if it's a touch device; generally, we don't want the complex cursor on mobile.
    if (window.matchMedia("(pointer: coarse)").matches) {
        cursor.style.display = "none";
        return;
    }

    const sineDots = Math.floor(AMOUNT * 0.3);
    const width = 26;
    const idleTimeout = 150;
    
    let lastFrame = 0;
    let mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let timeoutID: NodeJS.Timeout;
    let idle = false;
    let animationFrameId: number;

    class Dot {
      index: number;
      anglespeed: number;
      x: number;
      y: number;
      scale: number;
      range: number;
      element: HTMLSpanElement | null;
      lockX: number = 0;
      lockY: number = 0;
      angleX: number = 0;
      angleY: number = 0;
      
      setX: (val: number) => void;
      setY: (val: number) => void;

      constructor(index: number, element: HTMLSpanElement | null) {
        this.index = index;
        this.anglespeed = 0.05;
        this.x = mousePosition.x;
        this.y = mousePosition.y;
        this.scale = 1 - 0.05 * index;
        this.range = width / 2 - width / 2 * this.scale + 2;
        this.element = element;
        
        if (this.element) {
          gsap.set(this.element, { scale: this.scale });
          this.setX = gsap.quickSetter(this.element, "x", "px") as (val: number) => void;
          this.setY = gsap.quickSetter(this.element, "y", "px") as (val: number) => void;
        } else {
            this.setX = () => {};
            this.setY = () => {};
        }
      }

      lock() {
        this.lockX = this.x;
        this.lockY = this.y;
        this.angleX = Math.PI * 2 * Math.random();
        this.angleY = Math.PI * 2 * Math.random();
      }

      draw() {
        if (!this.element) return;
        if (!idle || this.index <= sineDots) {
            this.setX(this.x);
            this.setY(this.y);
        } else {
          this.angleX += this.anglespeed;
          this.angleY += this.anglespeed;
          this.y = this.lockY + Math.sin(this.angleY) * this.range;
          this.x = this.lockX + Math.sin(this.angleX) * this.range;
          this.setX(this.x);
          this.setY(this.y);
        }
      }
    }

    const dotsInstances = Array.from({ length: AMOUNT }).map(
      (_, i) => new Dot(i, dotsRef.current[i])
    );

    function onMouseMove(event: MouseEvent) {
      mousePosition.x = event.clientX;
      mousePosition.y = event.clientY;
      resetIdleTimer();
    }

    function render(timestamp: number) {
      positionCursor();
      lastFrame = timestamp;
      animationFrameId = requestAnimationFrame(render);
    }

    function positionCursor() {
      let x = mousePosition.x;
      let y = mousePosition.y;
      dotsInstances.forEach((dot, index, dotsArr) => {
        let nextDot = dotsArr[index + 1] || dotsArr[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        if (!idle || index <= sineDots) {
          const dx = (nextDot.x - dot.x) * 0.35;
          const dy = (nextDot.y - dot.y) * 0.35;
          x += dx;
          y += dy;
        }
      });
    }

    function startIdleTimer() {
      timeoutID = setTimeout(goInactive, idleTimeout);
      idle = false;
    }

    function resetIdleTimer() {
      clearTimeout(timeoutID);
      startIdleTimer();
    }

    function goInactive() {
      idle = true;
      dotsInstances.forEach((dot) => dot.lock());
    }

    window.addEventListener("mousemove", onMouseMove);
    
    lastFrame = performance.now();
    render(lastFrame);
    startIdleTimer();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timeoutID);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" className="hidden-svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div id="cursor" className="Cursor" ref={cursorRef}>
        {Array.from({ length: AMOUNT }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
          />
        ))}
      </div>
    </>
  );
}
