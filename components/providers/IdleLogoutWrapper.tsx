// // components/IdleLogoutWrapper.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { signOut } from "next-auth/react";

// const INACTIVITY_LIMIT = 50 * 60 * 1000; // 10 minutes

// export function IdleLogoutWrapper() {
//   const timer = useRef<NodeJS.Timeout | null>(null);

//   const resetTimer = () => {
//     if (timer.current) clearTimeout(timer.current);
//     timer.current = setTimeout(() => {
//       signOut();
//     }, INACTIVITY_LIMIT);
//   };

//   useEffect(() => {
//     const events = ["mousemove", "keydown", "mousedown", "touchstart"];
//     events.forEach((event) => window.addEventListener(event, resetTimer));

//     // Wait a short moment before starting timer to avoid false trigger
//     const startupDelay = setTimeout(() => {
//       resetTimer();
//     }, 1000);

//     return () => {
//       events.forEach((event) => window.removeEventListener(event, resetTimer));
//       clearTimeout(startupDelay);
//       if (timer.current) clearTimeout(timer.current);
//     };
//   }, []);

//   return null;
// }

// components/IdleLogoutWrapper.tsx

// "use client";

// import { ReactNode, useEffect, useRef, useState } from "react";
// import { signOut } from "next-auth/react";

// const INACTIVITY_LIMIT = 60 * 60 * 1000;

// export function IdleLogoutWrapper({ children }: { children: ReactNode }) {
//   const timer = useRef<NodeJS.Timeout | null>(null);
//   const countdown = useRef<NodeJS.Timeout | null>(null);
//   const [remainingTime, setRemainingTime] = useState(INACTIVITY_LIMIT);

//   const resetTimer = () => {
//     if (timer.current) clearTimeout(timer.current);
//     if (countdown.current) clearInterval(countdown.current);

//     setRemainingTime(INACTIVITY_LIMIT);

//     timer.current = setTimeout(() => {
//       signOut();
//     }, INACTIVITY_LIMIT);

//     // Log countdown every second
//     countdown.current = setInterval(() => {
//       setRemainingTime((prev) => {
//         const next = prev - 1000;
//         if (next <= 0) {
//           clearInterval(countdown.current!);
//         }
//         console.log(`⏳ Logging out in ${next / 1000} seconds`);
//         return next;
//       });
//     }, 1000);
//   };

//   useEffect(() => {
//     const events = ["mousemove", "keydown", "mousedown", "touchstart"];
//     events.forEach((event) => window.addEventListener(event, resetTimer));

//     resetTimer(); // Start the timer on mount

//     return () => {
//       events.forEach((event) => window.removeEventListener(event, resetTimer));
//       if (timer.current) clearTimeout(timer.current);
//       if (countdown.current) clearInterval(countdown.current);
//     };
//   }, []);

//   return <>{children}</>;
// }

// components/providers/IdleLogoutWrapper.tsx
"use client";

import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1 hour

export function IdleLogoutWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  useEffect(() => {
    if (!session) return;

    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        signOut(); // ✅ direct logout
      }, INACTIVITY_LIMIT);
    };

    const events = ["mousemove", "keydown", "click"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [session]);

  return <>{children}</>;
}
