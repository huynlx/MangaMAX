import React, { memo, useCallback, useRef, useState } from "react";
import ToolNav from "@/components/Shared/ToolNav";

const Draggable: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(() => {
    const container = containerRef.current;
    const draggable = draggableRef.current;

    const onMouseMove = (event: MouseEvent) => {
      position.x += event.movementX;
      position.y += event.movementY;

      if (container) {
        container.style.width = '100%';
        container.style.height = '100%';
      }
      if (draggable) {
        draggable.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }

      setPosition(position);
    };
    const onMouseUp = () => {
      if (container) {
        container.style.width = 'auto';
        container.style.height = 'auto';
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [position, setPosition, draggableRef]);

  const onTouchStart = useCallback(() => {
    const draggable = draggableRef.current;
    const container = containerRef.current;

    if (container) {
      container.style.width = '100%';
      container.style.height = '100%';
    }

    const onTouchMove = (event: TouchEvent) => {
      if (draggable) {
        var rect = draggable.getBoundingClientRect();
        position.x += event.touches[0].clientX - rect.left;
        position.y += event.touches[0].clientY - rect.top;
        draggable.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }

      setPosition(position);
    };
    const onTouchEnd = () => {
      if (container) {
        container.style.width = 'auto';
        container.style.height = 'auto';
      }
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }, [position, setPosition, draggableRef]);

  return (
    <div className="container" ref={containerRef}>
      <div className="draggableItem" ref={draggableRef} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
        <ToolNav />
      </div>
      <style jsx>{`
          .container{
            position: fixed;
            z-index: 11;
            top: 0;
            left: 0;
            overflow: hidden;
            touch-action: none;
          }
          .draggableItem {
            position: fixed;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
          }
        `}</style>
    </div>
  );
};

export default memo(Draggable);