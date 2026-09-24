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
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-indigo-600 shadow-xs">
          <Target className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Durée du cycle
          </h3>
          <p className="text-xs text-slate-500">Typiquement 28 jours</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label htmlFor="cycleLength" className="text-xs text-slate-600 font-medium">
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
            className="w-20 px-3 py-2 text-center text-xl font-bold text-indigo-700 bg-white border border-slate-200 rounded-xl focus:border-indigo-600 focus:ring-1 focus:ring-indigo-200 transition-colors duration-200 tabular-nums"
          />
          <span className="text-xs text-slate-400 font-medium" aria-hidden="true">
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
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              cycleData.cycleLength === preset.days
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};
