"use client";

import React from "react";
import { Target } from "lucide-react";
import { CycleData } from "../../types/cycle.types";

interface CycleLengthFieldProps {
  cycleData: CycleData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuickSelect: (days: number) => void;
}

const CYCLE_PRESETS = [
  { days: 26, label: "Court" },
  { days: 28, label: "Standard" },
  { days: 30, label: "Long" },
  { days: 32, label: "Très long" },
];

export const CycleLengthField: React.FC<CycleLengthFieldProps> = ({
  cycleData,
  onChange,
  onQuickSelect,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-violet-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl" />

      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-violet-100 shadow-sm">
            <Target className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Durée du cycle
            </h3>
            <p className="text-xs text-gray-400">Typiquement 28 jours</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <label htmlFor="cycleLength" className="text-sm text-gray-500">
            Nombre de jours
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="cycleLength"
              name="cycleLength"
              min="22"
              max="45"
              value={cycleData.cycleLength}
              onChange={onChange}
              aria-label="Durée du cycle en jours"
              className="w-20 px-3 py-2 text-center text-2xl font-extrabold text-violet-600 bg-white/60 backdrop-blur-sm border-2 border-violet-200/60 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all tabular-nums"
            />
            <span className="text-sm text-gray-400" aria-hidden="true">
              j
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {CYCLE_PRESETS.map((preset) => (
            <button
              key={preset.days}
              type="button"
              onClick={() => onQuickSelect(preset.days)}
              aria-label={`Cycle de ${preset.days} jours - ${preset.label}`}
              aria-pressed={cycleData.cycleLength === preset.days}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                cycleData.cycleLength === preset.days
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25 scale-105"
                  : "bg-white/50 text-gray-600 hover:bg-white/80 border border-gray-200/50"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
