"use client";

import { useEffect, useRef, useState } from "react";

export function useStreamingText(fullText: string, speedMs: number = 18) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setIsComplete(false);
    indexRef.current = 0;

    if (!fullText) {
      setIsComplete(true);
      return;
    }

    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= fullText.length) {
        setDisplayed(fullText);
        setIsComplete(true);
        clearInterval(interval);
        return;
      }
      setDisplayed(fullText.slice(0, indexRef.current));
    }, speedMs);

    return () => clearInterval(interval);
  }, [fullText, speedMs]);

  return { displayed, isComplete };
}
