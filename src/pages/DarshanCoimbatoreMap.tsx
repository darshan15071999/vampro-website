import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { MapPin, Minus, Plus, RotateCcw } from 'lucide-react';
import { galleryAssets } from './darshanGalleryMedia';

const homeView = { zoom: 1, x: 0, y: 0 };
const maxZoom = 2.8;
const panKeys = new Map([
  ['ArrowLeft', [8, 0]], ['ArrowRight', [-8, 0]],
  ['ArrowUp', [0, 8]], ['ArrowDown', [0, -8]],
]);

function constrainView(zoom: number, x: number, y: number) {
  const extent = (zoom - 1) * 50;
  return {
    zoom,
    x: Math.min(extent, Math.max(-extent, x)),
    y: Math.min(extent, Math.max(-extent, y)),
  };
}

export default function DarshanCoimbatoreMap() {
  const figureRef = useRef<HTMLElement>(null);
  const dragOrigin = useRef<{ id: number; pointerX: number; pointerY: number; x: number; y: number } | null>(null);
  const [view, setView] = useState(homeView);
  const [dragging, setDragging] = useState(false);
  const [entered, setEntered] = useState(false);
  const zoomed = view.zoom > 1;

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: .25 });
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  function changeZoom(step: number) {
    setView(({ zoom, x, y }) => constrainView(Math.min(maxZoom, Math.max(1, zoom + step)), x, y));
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!zoomed || event.button !== 0 || dragOrigin.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragOrigin.current = { id: event.pointerId, pointerX: event.clientX, pointerY: event.clientY, x: view.x, y: view.y };
    setDragging(true);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const origin = dragOrigin.current;
    if (!origin || origin.id !== event.pointerId) return;
    const { clientWidth, clientHeight } = event.currentTarget;
    const x = origin.x + (event.clientX - origin.pointerX) / clientWidth * 100;
    const y = origin.y + (event.clientY - origin.pointerY) / clientHeight * 100;
    setView((current) => constrainView(current.zoom, x, y));
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragOrigin.current?.id !== event.pointerId) return;
    dragOrigin.current = null;
    setDragging(false);
  }

  function panWithKeys(event: KeyboardEvent<HTMLDivElement>) {
    const offset = panKeys.get(event.key);
    if (!zoomed || !offset) return;
    event.preventDefault();
    setView(({ zoom, x, y }) => constrainView(zoom, x + offset[0], y + offset[1]));
  }

  return (
    <figure className="darshan-roots-map" ref={figureRef} data-entered={entered}>
      <div className="darshan-map-stage">
        <div className="darshan-map-viewport" role="group" aria-label="Coimbatore map. Zoom in to drag or pan with the arrow keys."
          tabIndex={0} data-zoomed={zoomed} data-dragging={dragging} onKeyDown={panWithKeys}
          onPointerDown={startDrag} onPointerMove={drag} onLostPointerCapture={finishDrag}>
          <img src={`${galleryAssets}/coimbatore-map.webp`} width={1440} height={810}
            alt="Street map of Coimbatore showing its roads, buildings and lakes" loading="lazy" decoding="async" draggable={false}
            style={{ transform: `translate(${view.x}%, ${view.y}%) scale(${view.zoom})` }} />
        </div>
        <div className="darshan-map-controls" role="group" aria-label="Map controls">
          <button type="button" aria-label="Zoom in" disabled={view.zoom >= maxZoom} onClick={() => changeZoom(.45)}><Plus size={17} aria-hidden="true" /></button>
          <button type="button" aria-label="Zoom out" disabled={!zoomed} onClick={() => changeZoom(-.45)}><Minus size={17} aria-hidden="true" /></button>
          <button type="button" aria-label="Reset map view" disabled={!zoomed} onClick={() => setView(homeView)}><RotateCcw size={15} aria-hidden="true" /></button>
        </div>
      </div>
      <figcaption>
        <span><MapPin size={16} aria-hidden="true" /> Coimbatore, Tamil Nadu</span>
      </figcaption>
    </figure>
  );
}
