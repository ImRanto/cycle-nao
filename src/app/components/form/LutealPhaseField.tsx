"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { CycleData } from "../../types/cycle.types";

interface LutealPhaseFieldProps {
  cycleData: CycleData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (length: number) => void;
}

const LUTEAL_PRESETS = [
  { days: 12, label: "Courte (12j)" },
  { days: 14, label: "Moyenne (14j)" },
  { days: 16, label: "Longue (16j)" },
];

export const LutealPhaseField: React.FC<LutealPhaseFieldProps> = ({
  cycleData,
  onChange,
  onSelect,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl" />

      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Phase lutéale
            </h3>
            <p className="text-xs text-gray-400">
              Durée entre l'ovulation et les règles (défaut : 14j)
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <label htmlFor="lutealPhaseLength" className="text-sm text-gray-500">
            Nombre de jours
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="lutealPhaseLength"
              name="lutealPhaseLength"
              min="10"
              max="18"
              value={cycleData.lutealPhaseLength}
              onChange={onChange}
              aria-label="Durée de la phase lutéale en jours"
              className="w-20 px-3 py-2 text-center text-2xl font-extrabold text-indigo-600 bg-white/60 backdrop-blur-sm border-2 border-indigo-200/60 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all tabular-nums"
            />
            <span className="text-sm text-gray-400" aria-hidden="true">
              j
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {LUTEAL_PRESETS.map((preset) => (
            <button
              key={preset.days}
              type="button"
              onClick={() => onSelect(preset.days)}
              aria-label={`Phase lutéale : ${preset.label}`}
              aria-pressed={cycleData.lutealPhaseLength === preset.days}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                cycleData.lutealPhaseLength === preset.days
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
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
