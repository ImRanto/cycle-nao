"use client";

import React from "react";
import { getPhaseInfo } from "../utils/phaseInfo";
import { Moon } from "lucide-react";

interface PhaseIndicatorProps {
  currentPhase: string;
  phaseProgress: number;
}

const CYCLE_PHASES = ["menstrual", "follicular", "ovulation", "luteal"];

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({
  currentPhase,
  phaseProgress,
}) => {
  const currentDetails = getPhaseInfo(currentPhase);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
            <Moon className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Où en êtes-vous ?</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold text-xs">
          {currentDetails.icon} {currentDetails.name}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-500 font-medium">Progression</span>
          <span className="text-xs font-bold text-purple-700 tabular-nums">{Math.round(phaseProgress)}%</span>
        </div>
        <div
          className="w-full bg-slate-100 rounded-full h-2"
          role="progressbar"
          aria-valuenow={Math.round(phaseProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progression de la phase ${currentDetails.name}: ${Math.round(phaseProgress)}%`}
        >
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${phaseProgress}%` }}
          />
        </div>
      </div>

      <div className="relative pt-2 mb-4">
        <div className="flex justify-between mb-4 relative z-10">
          {CYCLE_PHASES.map((phaseKey) => {
            const details = getPhaseInfo(phaseKey);
            const isActive = phaseKey === currentPhase;

            return (
              <div
                key={phaseKey}
                className="relative flex flex-col items-center"
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-base mb-1.5 transition-colors duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white font-bold"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {details.icon}
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-purple-700 font-bold" : "text-slate-500"
                  }`}
                >
                  {details.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="absolute top-5 left-4 right-4 h-0.5 bg-slate-200 z-0" />
      </div>

      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <span className="font-semibold text-slate-800">Phase actuelle :</span>{" "}
        {currentDetails.description}
      </div>
    </div>
  );
};

export default PhaseIndicator;
