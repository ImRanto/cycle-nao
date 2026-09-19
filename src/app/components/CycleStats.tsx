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

const CycleStats: React.FC<CycleStatsProps> = ({ results }) => {
  const formatFertileRange = () => {
    const start = new Date(results.fertileWindow.start);
    const end = new Date(results.fertileWindow.end);
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString("fr-FR", { month: "short" })}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Prédictions</h2>
          <p className="text-xs text-gray-500">Estimations basées sur vos paramètres</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-pink-100 bg-pink-50/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white">
              <Egg className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Ovulation</h3>
              <p className="text-xs text-gray-500">Jour estimé d'ovulation</p>
            </div>
          </div>

          <div className="text-center py-1">
            <div className="text-lg font-bold text-gray-900">
              {new Date(results.ovulationDate).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {formatDate(results.ovulationDate)}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Fenêtre fertile</h3>
              <p className="text-xs text-gray-500">Période de fertilité</p>
            </div>
          </div>

          <div className="text-center py-1">
            <div className="text-lg font-bold text-gray-900">
              {formatFertileRange()}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              6 jours de fertilité
            </p>
          </div>

          <div className="mt-2 flex justify-center gap-1">
            {[...Array(6)].map((_, i) => {
              const date = new Date(results.fertileWindow.start);
              date.setDate(date.getDate() + i);
              const isOvulation = date.toISOString().split("T")[0] === results.ovulationDate;
              return (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold ${
                    isOvulation
                      ? "bg-pink-600 text-white"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Prochaines règles</h3>
              <p className="text-xs text-gray-500">Début du prochain cycle</p>
            </div>
          </div>

          <div className="text-center py-1">
            <div className="text-lg font-bold text-gray-900">
              {new Date(results.nextPeriod).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {formatDate(results.nextPeriod)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2.5 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 font-medium mb-0.5">Phase actuelle</div>
            <div className="font-semibold text-sm text-purple-700">
              {results.currentPhase === "menstrual" && "Menstruelle"}
              {results.currentPhase === "follicular" && "Folliculaire"}
              {results.currentPhase === "ovulation" && "Ovulation"}
              {results.currentPhase === "luteal" && "Lutéale"}
            </div>
          </div>
          <div className="text-center p-2.5 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 font-medium mb-0.5">Progression</div>
            <div className="font-semibold text-sm text-gray-800">
              {Math.round(results.phaseProgress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleStats;
