"use client";

import { useState } from "react";
import { T, type Lang } from "./translations";

const SEG_COLORS = ["#66d9ef", "#3b82f6", "#8b5cf6", "#f59e0b"];

export function PdmAnatomy({ lang }: { lang: Lang }) {
  const p = T[lang].pdm;
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: PartId anatomy + lifecycle */}
      <div className="space-y-6">
        {/* PartId builder */}
        <div className="glass bg-slate-950/50 p-6">
          <div className="text-xs text-cyan-400 font-mono mb-4">{p.partIdLabel}</div>

          {/* The ID */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 font-mono text-lg sm:text-2xl mb-5 flex-wrap">
            {p.segments.map((seg, i) => (
              <span key={i} className="flex items-center">
                <button
                  onClick={() => setActive(i)}
                  className="px-2 sm:px-3 py-2 rounded-lg font-bold transition"
                  style={{
                    backgroundColor: active === i ? `${SEG_COLORS[i]}33` : "transparent",
                    color: SEG_COLORS[i],
                    outline: active === i ? `1px solid ${SEG_COLORS[i]}` : "1px solid transparent",
                  }}
                >
                  {seg.code}
                </button>
                {i < p.segments.length - 1 && <span className="text-slate-600">-</span>}
              </span>
            ))}
          </div>

          {/* Active segment detail */}
          <div className="rounded-lg bg-slate-800/50 p-4 min-h-[64px]">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: SEG_COLORS[active] }}
              />
              <span className="font-semibold text-slate-100">{p.segments[active].label}</span>
            </div>
            <div className="text-sm text-slate-400 pl-5">{p.segments[active].hint}</div>
          </div>

          <div className="text-[11px] text-slate-500 mt-4 font-mono text-center">{p.example}</div>
        </div>

        {/* Lifecycle */}
        <div className="glass bg-slate-950/50 p-6">
          <div className="text-xs text-cyan-400 font-mono mb-4">{p.lifecycleTitle}</div>
          <div className="relative">
            {p.phases.map((ph, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 last:pb-0 relative">
                {/* connector line */}
                {i < p.phases.length - 1 && (
                  <div className="absolute left-[7px] top-5 bottom-0 w-px bg-slate-700" />
                )}
                <div
                  className="w-4 h-4 rounded-full shrink-0 mt-0.5 ring-2 ring-slate-950 z-10"
                  style={{ backgroundColor: ph.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {ph.code}
                    </span>
                    <span className="font-semibold text-sm text-slate-100">{ph.phase}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{ph.stage}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 mt-3 italic">{p.lifecycleNote}</div>
        </div>
      </div>

      {/* Right: Class families */}
      <div className="glass bg-slate-950/50 p-6">
        <div className="text-xs text-cyan-400 font-mono mb-4">{p.familiesTitle}</div>
        <div className="space-y-2">
          {p.families.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg bg-slate-800/40 px-3 py-2.5 hover:bg-slate-800/70 transition"
            >
              <span className="font-mono text-xs text-cyan-400/80 w-20 shrink-0">{f.range}</span>
              <span className="text-sm text-slate-300">{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
