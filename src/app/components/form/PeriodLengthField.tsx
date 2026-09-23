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
    <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-rose-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl" />

      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-rose-100 shadow-sm">
            <Droplets className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Durée des règles
            </h3>
            <p className="text-xs text-gray-400">Typiquement 3-7 jours</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <label htmlFor="periodLength" className="text-sm text-gray-500">
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
              className="w-20 px-3 py-2 text-center text-2xl font-extrabold text-rose-600 bg-white/60 backdrop-blur-sm border-2 border-rose-200/60 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all tabular-nums"
            />
            <span className="text-sm text-gray-400" aria-hidden="true">
              j
            </span>
          </div>
        </div>

        <div className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-rose-100/50">
          <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
            Fin estimée
          </div>
          <div className="text-lg font-bold text-rose-600">
            {results ? formatShortDate(results.periodEndDate) : "\u00A0"}
          </div>
        </div>
      </div>
    </div>
  );
};
