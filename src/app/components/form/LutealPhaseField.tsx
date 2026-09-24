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
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-purple-600 shadow-xs">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Phase lutéale
          </h3>
          <p className="text-xs text-slate-500">
            Nombre de jours entre l'ovulation et les règles suivantes (14j en général)
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label htmlFor="lutealPhaseLength" className="text-xs text-slate-600 font-medium">
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
            className="w-20 px-3 py-2 text-center text-xl font-bold text-purple-700 bg-white border border-slate-200 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-200 transition-colors duration-200 tabular-nums"
          />
          <span className="text-xs text-slate-400 font-medium" aria-hidden="true">
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
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              cycleData.lutealPhaseLength === preset.days
                ? "bg-purple-600 text-white shadow-xs"
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
