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
    <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-violet-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl" />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-violet-100 shadow-sm">
              <Moon className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Phase du cycle</h3>
          </div>
          <div className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-semibold text-sm">
            {currentDetails.icon} {currentDetails.name}
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Progression</span>
            <span className="text-sm font-bold text-violet-600 tabular-nums">{Math.round(phaseProgress)}%</span>
          </div>
          <div
            className="w-full bg-gray-100 rounded-full h-2.5"
            role="progressbar"
            aria-valuenow={Math.round(phaseProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression de la phase ${currentDetails.name}: ${Math.round(phaseProgress)}%`}
          >
            <div
              className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
        </div>

        <div className="relative pt-2 mb-4">
          <div className="flex justify-between mb-6">
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
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-2 transition-all duration-300 ${
                      isActive
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25 scale-110"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {details.icon}
                  </div>
                  <span
                    className={`text-[10px] font-medium ${
                      isActive ? "text-violet-700" : "text-gray-400"
                    }`}
                  >
                    {details.name}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-2 w-1.5 h-1.5 bg-violet-500 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="absolute top-5 left-4 right-4 h-0.5 bg-gradient-to-r from-red-300 via-pink-300 to-purple-300" />
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Phase actuelle :</span>{" "}
            {currentDetails.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhaseIndicator;
