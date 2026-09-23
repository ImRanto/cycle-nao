"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { CycleData } from "../../types/cycle.types";

interface StartDateFieldProps {
  cycleData: CycleData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mounted: boolean;
  todayDisplay: string;
}

export const StartDateField: React.FC<StartDateFieldProps> = ({
  cycleData,
  onChange,
  mounted,
  todayDisplay,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-300/20 rounded-full -translate-y-8 translate-x-8 blur-2xl" />

      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-100 shadow-sm">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Date de début des règles
            </h3>
            <p className="text-xs text-gray-400">
              Sélectionnez la date de vos dernières règles
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <label htmlFor="startDate" className="sr-only">
            Date de début des règles
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={cycleData.startDate}
            onChange={onChange}
            aria-label="Date de début des règles"
            className="flex-1 px-5 py-4 bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-lg text-gray-800"
            required
          />
          <div className="sm:w-48 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60">
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              Aujourd'hui
            </div>
            <div className="font-bold text-gray-800 text-lg mt-0.5">
              {mounted ? todayDisplay : "\u00A0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
