import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f7f3ec] text-[#1d3347]">
      <div className="w-12 h-12 rounded-full border-2 border-[#b8975a]/30 border-t-[#b8975a] animate-spin mb-4" />
      <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#b8975a]">
        Composing Experience...
      </span>
    </div>
  );
}
