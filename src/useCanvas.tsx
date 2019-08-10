import { useEffect, useRef, RefObject } from 'react';

function useCanvas(draw, context = '2d'): RefObject<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext(context);
    let animationFrameId = requestAnimationFrame(renderFrame);

    function renderFrame(): void {
      animationFrameId = requestAnimationFrame(renderFrame);
      draw(ctx);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, draw]);

  return canvasRef;
}
export default useCanvas;
