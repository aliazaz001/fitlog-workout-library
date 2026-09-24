"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          background: "#15171d",
          color: "#ffffff",
          border: "1px solid #222630",
        },
      }}
    />
  );
}