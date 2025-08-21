import { useState, useEffect, useMemo, useCallback } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

interface ParticleData {
  id: number;
  initialX: number;
  initialY: number;
  animateX: number;
  animateY: number;
  duration: number;
  delay: number;
}

interface MatrixColumn {
  id: number;
  left: number;
  duration: number;
  delay: number;
  characters: Array<{
    char: string;
    opacity: number;
  }>;
}

interface NeuralLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

export const useVisualEffects = () => {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 1920, height: 1080 });

  // Memoized data for consistent SSR/CSR rendering
  const particleData = useMemo<ParticleData[]>(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      initialX: (i * 61 + 123) % 100,
      initialY: (i * 37 + 456) % 100,
      animateX: (i * 83 + 789) % 100,
      animateY: (i * 41 + 234) % 100,
      duration: 10 + (i % 10),
      delay: (i % 5) * 0.5
    })), []
  );

  const matrixData = useMemo<MatrixColumn[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: i * 5,
      duration: 2 + (i % 3),
      delay: (i % 4) * 0.5,
      characters: Array.from({ length: 20 }, (_, j) => ({
        char: String.fromCharCode(0x30A0 + ((i * j + 42) % 96)),
        opacity: ((i * j + 17) % 100) / 100
      }))
    })), []
  );

  const neuralLines = useMemo<NeuralLine[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x1: ((i * 23 + 45) % 100),
      y1: ((i * 67 + 89) % 100),
      x2: ((i * 34 + 12) % 100),
      y2: ((i * 78 + 56) % 100),
      delay: i * 0.5
    })), []
  );

  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    handleResize();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [handleResize]);

  return {
    isClient,
    dimensions,
    particleData,
    matrixData,
    neuralLines
  };
};
