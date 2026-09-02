import * as React from "react";
import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type TEvaluateContainerStyleArgs = {
  x: number;
  y: number;
  duration?: number;
  addRandomness?: boolean;
  displayElement?: React.ReactNode;
};

const ClickBurst = () => {
  const lineLength = 24;

  const allPoints = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    return {
      x1: lineLength,
      y1: lineLength,
      x2: lineLength + Math.cos(angle) * lineLength,
      y2: lineLength + Math.sin(angle) * lineLength,
    };
  });

  return (
    <svg
      height={lineLength * 2}
      width={lineLength * 2}
      viewBox={`0 0 ${lineLength * 2} ${lineLength * 2}`}
      xmlns="http://www.w3.org/2000/svg"
      className="-translate-x-1/2 -translate-y-1/2 pointer-events-none"
      aria-hidden="true"
    >
      {allPoints.map((point, index) => (
        <line
          key={index}
          style={{
            stroke: "#ed1c24",
            strokeWidth: 3,
            strokeLinecap: "round",
            strokeDasharray: lineLength / 2,
            strokeDashoffset: 0,
            opacity: 0.95,
          }}
          x1={point.x1}
          y1={point.y1}
          x2={point.x2}
          y2={point.y2}
        />
      ))}
    </svg>
  );
};

const evaluateContainerStyle = ({
  x,
  y,
  duration = 400,
  addRandomness = true,
}: TEvaluateContainerStyleArgs) => {
  const evaluatedContainerStyle: CSSProperties = {
    position: "fixed" as const,
    left: x,
    top: y,
    transition: `all ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
    zIndex: 9999,
    pointerEvents: "none",
  };
  if (addRandomness) {
    const radius = 24;
    const minimumDistance = 12;
    const translateX =
      (Math.random() > 0.5 ? 1 : -1) *
      (minimumDistance + Math.random() * radius);
    const translateY =
      (Math.random() > 0.5 ? 1 : -1) *
      (minimumDistance + Math.random() * radius);

    const rotationAngle = (Math.random() - 0.5) * 40;

    evaluatedContainerStyle.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) rotate(${rotationAngle}deg) scale(1.1)`;
  } else {
    evaluatedContainerStyle.transform = "translate(-50%, -50%)";
  }
  return evaluatedContainerStyle;
};

export const useEventOnomatopoeia = (props?: {
  showClickBurst?: boolean;
  displayElement?: React.ReactNode;
}) => {
  const { showClickBurst = true, displayElement } = props || {};
  const [portalElements, setPortalElements] = useState<Record<string, React.ReactNode>>({});

  const trigger = useCallback(
    (args: TEvaluateContainerStyleArgs) => {
      const {
        x,
        y,
        duration = 500,
        displayElement: triggerDisplayElement,
      } = args;
      if (!x || !y) return;
      const evaluatedContainerStyle = evaluateContainerStyle(args);
      const id = window.crypto ? window.crypto.randomUUID() : `burst_${Math.random()}`;

      const finalDisplayElement = triggerDisplayElement ?? displayElement;

      const items = [
        finalDisplayElement &&
          createPortal(
            <div
              key={`${id}_text`}
              className={cn(
                "select-none pointer-events-none font-black text-2xl tracking-tighter drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-[#ffd437] animate-in fade-in zoom-in duration-150",
              )}
              style={evaluatedContainerStyle}
            >
              {finalDisplayElement}
            </div>,
            document.body,
          ),
        showClickBurst &&
          createPortal(
            <div
              key={`${id}_burst`}
              className="select-none pointer-events-none animate-in fade-in zoom-in duration-200"
              style={evaluateContainerStyle({ ...args, addRandomness: false })}
            >
              <ClickBurst key="burst" />
            </div>,
            document.body,
          ),
      ].filter(Boolean);

      setPortalElements((current) => ({
        ...current,
        [id]: <React.Fragment key={id}>{items}</React.Fragment>,
      }));

      setTimeout(() => {
        setPortalElements((current) => {
          const newState = { ...current };
          delete newState[id];
          return newState;
        });
      }, duration);
    },
    [displayElement, showClickBurst],
  );

  const renderedPortalElements = useMemo(
    () => <>{Object.values(portalElements)}</>,
    [portalElements],
  );

  return { domElement: renderedPortalElements, trigger };
};
