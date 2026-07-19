"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// --- Simple UI Components ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline', size?: 'sm' }>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90",
          size === "sm" ? "h-9 rounded-md px-3" : "h-10 px-4 py-2",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"
// -----------------------------

interface TimelineItem {
  id: number;
  title: string;
  date?: string;
  content: string;
  category?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  relatedIds?: number[];
  status?: "completed" | "in-progress" | "pending";
  energy?: number;
}

interface RadialOrbitalTimelineProps {
  autoPlay?: boolean;
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
  autoPlay = false,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [, setActiveStepIndex] = useState(0);
  const viewMode = "orbital";
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const centerOffset = { x: 0, y: 0 };
    const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const continuousIndexRef = useRef(0);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
            setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (newState[id]) {
        const idx = timelineData.findIndex(item => item.id === id);
        if (idx !== -1) setActiveStepIndex(idx);
      }

      if (!prev[id]) {
                // setAutoRotate(false);

        const newPulseEffect: Record<number, boolean> = {};
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
                setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };


  useEffect(() => {
    if (!autoPlay) return;
    
    // Initially open the first item
    if (Object.keys(expandedItems).length === 0 && timelineData.length > 0) {
      setExpandedItems({ [timelineData[0].id]: true });
      centerViewOnNode(timelineData[0].id);
    }

    const timer = setInterval(() => {
      continuousIndexRef.current += 1;
      const nextIndex = ((continuousIndexRef.current % timelineData.length) + timelineData.length) % timelineData.length;
      const nextId = timelineData[nextIndex].id;
      setExpandedItems({ [nextId]: true });
      
      const targetAngle = (continuousIndexRef.current / timelineData.length) * 360;
      setRotationAngle(270 - targetAngle);
    }, 2000);
    return () => clearInterval(timer);
  }, [autoPlay, timelineData, expandedItems]);

  

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital") return;

    const idx = timelineData.findIndex((item) => item.id === nodeId);
    if (idx === -1) return;

    const totalNodes = timelineData.length;
    const currentMod = continuousIndexRef.current % totalNodes;
    // ensure currentMod is positive
    const posMod = currentMod >= 0 ? currentMod : currentMod + totalNodes;
    
    let diff = idx - posMod;
    if (diff > totalNodes / 2) diff -= totalNodes;
    if (diff < -totalNodes / 2) diff += totalNodes;
    
    continuousIndexRef.current += diff;
    
    const targetAngle = (continuousIndexRef.current / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // Tighter orbit on phones so expanded cards stay inside the clipped container
    const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 160 : 200;
    const radian = (angle * Math.PI) / 180;
    const floatY = 0;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y + floatY;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  return (
    <div
      className="w-full h-[400px] sm:h-[500px] flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center scale-[0.68] sm:scale-90 lg:scale-100">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px) rotateX(15deg) rotateY(-5deg)`,
            transition: "transform 1s ease-in-out",
          }}
        >
          <div className="absolute w-24 h-24 rounded-full flex items-center justify-center z-20">
            <div className="absolute inset-0 rounded-full bg-[#3B3BFF]/20 animate-pulse blur-xl"></div>
            <div className="absolute w-32 h-32 rounded-full border border-[#3B3BFF]/40 animate-ping opacity-70"></div>
            <div
              className="absolute w-40 h-40 rounded-full border border-[#3B3BFF]/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <img src="/favicon.png" className="w-16 h-16 object-contain rounded-full shadow-[0_0_40px_rgba(59,59,255,0.8)] relative z-10" alt="Vampro" />
          </div>

          <div className="absolute w-96 h-96 rounded-full border border-[#2b5be3]/20"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
              transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease-in-out",
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(43,91,227,0.2) 0%, rgba(43,91,227,0) 70%)`,
                    width: `90px`,
                    height: `90px`,
                    left: `-25px`,
                    top: `-25px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : "bg-[#07060F] text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white shadow-lg shadow-white/30"
                      : "border-[#2b5be3]/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-16  whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                <div
                  className={`absolute top-24 left-1/2 -translate-x-1/2 w-64 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
                    isExpanded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-8 pointer-events-none"
                  }`}
                >
                  <Card className="w-full bg-[#07060F]/90 backdrop-blur-lg border-[#2b5be3]/30 shadow-xl shadow-[#2b5be3]/10 overflow-hidden text-white">
                    <div className="absolute right-2 top-2 text-7xl font-black text-white/[0.03] pointer-events-none select-none z-0">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#2b5be3]/50"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <CardTitle className="text-sm mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80 relative z-10">
                      <p>{item.content}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
