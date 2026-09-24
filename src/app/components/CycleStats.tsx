"use client";

import React from "react";
import {
  Calendar,
  Heart,
  TrendingUp,
  Egg,
  Droplets,
} from "lucide-react";
import { CycleResults } from "../types/cycle.types";
import { formatDate } from "../utils/cycleCalculations";

interface CycleStatsProps {
  results: CycleResults;
}

const PhaseLabel: Record<string, string> = {
  menstrual: "Menstruelle",
  follicular: "Folliculaire",
  ovulation: "Ovulation",
  luteal: "Lutéale",
};

const CycleStats: React.FC<CycleStatsProps> = ({ results }) => {
  const formatFertileRange = () => {
    const start = new Date(results.fertileWindow.start);
    const end = new Date(results.fertileWindow.end);
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString("fr-FR", { month: "short" })}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
        <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Prédictions</h2>
          <p className="text-xs text-slate-500">Calculs automatiques du cycle</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:border-slate-300 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white">
              <Egg className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-xs md:text-sm">Ovulation</h3>
              <p className="text-[11px] text-slate-500">Fertilité maximale</p>
            </div>
          </div>

          <div className="text-center py-1">
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              {new Date(results.ovulationDate).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {formatDate(results.ovulationDate)}
            </p>
          </div>

          <div className="mt-2 text-center">
            <span className="inline-block bg-pink-50 text-pink-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-pink-200">
              Période critique
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:border-slate-300 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-xs md:text-sm">Fenêtre fertile</h3>
              <p className="text-[11px] text-slate-500">Meilleure période pour concevoir</p>
            </div>
          </div>

          <div className="text-center py-1">
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              {formatFertileRange()}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              7 jours de fertilité
            </p>
          </div>

          <div className="mt-2 flex justify-center gap-1">
            {[...Array(7)].map((_, idx) => {
              const date = new Date(results.fertileWindow.start);
              date.setDate(date.getDate() + idx);
              const isOvulation = date.toISOString().split("T")[0] === results.ovulationDate;
              return (
                <div
                  key={idx}
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-colors duration-200 ${
                    isOvulation
                      ? "bg-pink-600 text-white"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:border-slate-300 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-xs md:text-sm">Prochaines règles</h3>
              <p className="text-[11px] text-slate-500">Préparation recommandée</p>
            </div>
          </div>

          <div className="text-center py-1">
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              {new Date(results.nextPeriod).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {formatDate(results.nextPeriod)}
            </p>
          </div>

          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-indigo-200">
              <Droplets className="w-3 h-3" />
              Période menstruelle à venir
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Phase</div>
            <div className="font-bold text-xs text-purple-700">
              {PhaseLabel[results.currentPhase] || "Inconnue"}
            </div>
          </div>
          <div className="text-center p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Progression</div>
            <div className="font-bold text-xs text-pink-600 tabular-nums">
              {Math.round(results.phaseProgress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleStats;
