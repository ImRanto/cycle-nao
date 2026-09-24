"use client";

import React from "react";
import { Droplets } from "lucide-react";
import { CycleData, CycleResults } from "../../types/cycle.types";
import { formatShortDate } from "../../utils/cycleCalculations";

interface PeriodLengthFieldProps {
  cycleData: CycleData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  results: CycleResults | null;
}

export const PeriodLengthField: React.FC<PeriodLengthFieldProps> = ({
  cycleData,
  onChange,
  results,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-rose-600 shadow-xs">
          <Droplets className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Durée des règles
          </h3>
          <p className="text-xs text-slate-500">Typiquement 3-7 jours</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label htmlFor="periodLength" className="text-xs text-slate-600 font-medium">
          Nombre de jours
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            id="periodLength"
            name="periodLength"
            min="1"
            max={cycleData.cycleLength - 1}
            value={cycleData.periodLength}
            onChange={onChange}
            aria-label="Durée des règles en jours"
            className="w-20 px-3 py-2 text-center text-xl font-bold text-rose-700 bg-white border border-slate-200 rounded-xl focus:border-rose-600 focus:ring-1 focus:ring-rose-200 transition-colors duration-200 tabular-nums"
          />
          <span className="text-xs text-slate-400 font-medium" aria-hidden="true">
            j
          </span>
        </div>
      </div>

      <div className="p-3 bg-white border border-slate-200 rounded-xl">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">
          Fin estimée
        </div>
        <div className="text-base font-bold text-rose-700">
          {results ? formatShortDate(results.periodEndDate) : "\u00A0"}
        </div>
      </div>
    </div>
  );
};
