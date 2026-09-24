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
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-purple-600 shadow-xs">
          <Calendar className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Date de début des règles
          </h3>
          <p className="text-xs text-slate-500">
            Sélectionnez la date de vos dernières règles
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
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
          className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-200 transition-colors duration-200 text-base text-slate-800"
          required
        />
        <div className="sm:w-44 p-3 bg-white border border-slate-200 rounded-xl">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            Aujourd'hui
          </div>
          <div className="font-bold text-slate-800 text-base mt-0.5">
            {mounted ? todayDisplay : "\u00A0"}
          </div>
        </div>
      </div>
    </div>
  );
};
