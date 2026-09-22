"use client";

import React from "react";
import { Moon } from "lucide-react";
import { CycleData } from "../../types/cycle.types";

interface LutealPhaseFieldProps {
  cycleData: CycleData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectValue: (value: number) => void;
}

export const LutealPhaseField: React.FC<LutealPhaseFieldProps> = ({
  cycleData,
  onChange,
  onSelectValue,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
              <Moon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Phase lutéale
              </h3>
              <p className="text-xs text-gray-400">
                Après l'ovulation · standard 14 jours
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-indigo-600 tabular-nums">
              {cycleData.lutealPhaseLength}
            </span>
            <span className="text-sm font-medium text-gray-400">j</span>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Court</span>
            <span>Standard</span>
            <span>Long</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((cycleData.lutealPhaseLength - 10) / 8) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-4">
          <label htmlFor="lutealPhaseLength" className="sr-only">
            Durée de la phase lutéale en jours
          </label>
          <input
            type="range"
            id="lutealPhaseLength"
            name="lutealPhaseLength"
            min="10"
            max="18"
            value={cycleData.lutealPhaseLength}
            onChange={onChange}
            aria-label="Durée de la phase lutéale en jours"
            aria-valuemin={10}
            aria-valuemax={18}
            aria-valuenow={cycleData.lutealPhaseLength}
            aria-valuetext={`${cycleData.lutealPhaseLength} jours`}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200"
          />
        </div>

        {/* Chips de sélection rapide */}
        <div className="flex gap-2">
          {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onSelectValue(val)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                cycleData.lutealPhaseLength === val
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
                  : "bg-white/50 text-gray-600 hover:bg-white/80 border border-gray-200/50"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
