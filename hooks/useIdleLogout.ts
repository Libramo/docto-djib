"use client";
// hooks/useIdleLogout.ts

import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes in ms

export function useIdleLogout() {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      signOut(); // Auto logout
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // Initialize timer on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
}
