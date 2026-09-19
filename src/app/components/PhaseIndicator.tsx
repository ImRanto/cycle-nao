"use client";

import React from "react";
import { getPhaseInfo } from "../utils/cycleCalculations";
import { Moon } from "lucide-react";

interface PhaseIndicatorProps {
  currentPhase: string;
  phaseProgress: number;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({
  currentPhase,
  phaseProgress,
}) => {
  const phaseInfo = getPhaseInfo(currentPhase);
  const phases = ["menstrual", "follicular", "ovulation", "luteal"];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700">
            <Moon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Phase du cycle</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold text-xs">
          {phaseInfo.icon} {phaseInfo.name}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-500">Progression de la phase</span>
          <span className="text-xs font-bold text-purple-700 tabular-nums">{Math.round(phaseProgress)}%</span>
        </div>
        <div
          className="w-full bg-gray-100 rounded-full h-2"
          role="progressbar"
          aria-valuenow={Math.round(phaseProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progression de la phase ${phaseInfo.name}: ${Math.round(phaseProgress)}%`}
        >
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${phaseProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {phases.map((phase) => {
          const info = getPhaseInfo(phase);
          const isActive = phase === currentPhase;

          return (
            <div
              key={phase}
              className={`p-2 rounded-lg flex flex-col items-center text-center transition-colors ${
                isActive
                  ? "bg-purple-50 border border-purple-200 text-purple-900 font-medium"
                  : "bg-gray-50 text-gray-500 border border-transparent"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              <div className="text-base mb-1">{info.icon}</div>
              <span className="text-[11px] leading-tight">{info.name}</span>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-xs text-gray-600">
          <span className="font-semibold text-gray-800">Phase actuelle :</span>{" "}
          {phaseInfo.description}
        </p>
      </div>
    </div>
  );
};

export default PhaseIndicator;
