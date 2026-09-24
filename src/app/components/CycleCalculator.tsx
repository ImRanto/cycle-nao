"use client";

import React, { useState, useEffect } from "react";
import { CycleData, CycleResults } from "../types/cycle.types";
import { calculateCycle } from "../utils/cycleCalculations";
import CycleCalendar from "./CycleCalendar";
import CycleStats from "./CycleStats";
import PhaseIndicator from "./PhaseIndicator";
import { StartDateField } from "./form/StartDateField";
import { CycleLengthField } from "./form/CycleLengthField";
import { PeriodLengthField } from "./form/PeriodLengthField";
import { LutealPhaseField } from "./form/LutealPhaseField";
import {
  Save,
  FileText,
  BarChart3,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

const CycleCalculator: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [todayStr, setTodayStr] = useState("");
  const [todayDisplay, setTodayDisplay] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const now = new Date();
    setTodayStr(now.toISOString().split("T")[0]);
    setTodayDisplay(now.toLocaleDateString("fr-FR"));
    setCurrentYear(now.getFullYear());
    setMounted(true);
  }, []);

  const defaultStartDate = todayStr || new Date().toISOString().split("T")[0];

  const [cycleData, setCycleData] = useState<CycleData>({
    startDate: defaultStartDate,
    cycleLength: 28,
    periodLength: 4,
    lutealPhaseLength: 14,
  });

  const [results, setResults] = useState<CycleResults | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!todayStr) return;
    try {
      const saved = localStorage.getItem("lastCycleData");
      if (saved) {
        const savedConfig = JSON.parse(saved);
        setCycleData(savedConfig);
        updateResults(savedConfig);
      } else {
        const defaultConfig = { ...cycleData, startDate: todayStr };
        setCycleData(defaultConfig);
        updateResults(defaultConfig);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la lecture des données sauvegardées:",
        error
      );
      const defaultConfig = { ...cycleData, startDate: todayStr };
      updateResults(defaultConfig);
    }
  }, [todayStr]);

  const updateResults = (config: CycleData) => {
    const computed = calculateCycle(config);
    setResults(computed);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    let parsedVal: string | number = value;
    if (type === "number") {
      parsedVal = Math.max(1, parseInt(value) || 0);
    }

    const nextData = {
      ...cycleData,
      [name]: parsedVal,
    };

    if (name === "periodLength" && typeof parsedVal === "number") {
      nextData.periodLength = Math.min(
        parsedVal,
        nextData.cycleLength - 1
      );
    }
    if (name === "cycleLength" && typeof parsedVal === "number") {
      nextData.periodLength = Math.min(
        cycleData.periodLength,
        parsedVal - 1
      );
    }

    setCycleData(nextData);

    if (nextData.startDate && nextData.cycleLength > 1) {
      updateResults(nextData);
    }
  };

  const handleQuickSelectCycleLength = (days: number) => {
    const nextData = {
      ...cycleData,
      cycleLength: days,
      periodLength: Math.min(cycleData.periodLength, days - 1),
    };

    setCycleData(nextData);
    updateResults(nextData);
  };

  const handleSelectLutealPhase = (length: number) => {
    const nextData = { ...cycleData, lutealPhaseLength: length };
    setCycleData(nextData);
    updateResults(nextData);
  };

  const handleSave = () => {
    localStorage.setItem("lastCycleData", JSON.stringify(cycleData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-50 to-purple-50 p-0 md:p-8">
      <div className="max-w-7xl mx-auto pr-0 md:pr-16 lg:pr-20">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculateur de Cycle Intelligent
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Suivez votre cycle menstruel avec précision. Calculs automatiques,
            prédictions fiables et interface élégante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative overflow-hidden rounded-none md:rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-200/20 rounded-full blur-3xl" />

              <div className="relative z-10 p-6 md:p-8">
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      Informations du cycle
                    </h2>
                    <p className="text-gray-500">
                      Renseignez vos données pour des calculs précis
                    </p>
                  </div>
                </div>

                <form className="space-y-6">
                  <StartDateField
                    cycleData={cycleData}
                    onChange={handleInputChange}
                    mounted={mounted}
                    todayDisplay={todayDisplay}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CycleLengthField
                      cycleData={cycleData}
                      onChange={handleInputChange}
                      onQuickSelect={handleQuickSelectCycleLength}
                    />

                    <PeriodLengthField
                      cycleData={cycleData}
                      onChange={handleInputChange}
                      results={results}
                    />
                  </div>

                  <LutealPhaseField
                    cycleData={cycleData}
                    onChange={handleInputChange}
                    onSelect={handleSelectLutealPhase}
                  />

                  <button
                    type="button"
                    onClick={handleSave}
                    className="group relative w-full overflow-hidden rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-violet-600 to-pink-600" />
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 py-4 px-6 flex items-center justify-center gap-3">
                      {isSaved ? (
                        <>
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-white font-semibold text-lg">
                            Enregistré !
                          </span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                          <span className="text-white font-semibold text-lg">
                            Enregistrer mes préférences
                          </span>
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>

            {results && (
              <CycleCalendar
                startDate={cycleData.startDate}
                cycleLength={cycleData.cycleLength}
                periodLength={cycleData.periodLength}
                results={results}
              />
            )}
          </div>

          <div className="space-y-8">
            {results && (
              <>
                <CycleStats results={results} />
                <PhaseIndicator
                  currentPhase={results.currentPhase}
                  phaseProgress={results.phaseProgress}
                />

                <div className="bg-linear-to-r from-white to-purple-50 rounded-none md:rounded-2xl shadow-xl p-6 border border-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-800">
                      Statistiques du cycle
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                      <span className="text-gray-600">Jour actuel</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {results.cycleDay > 0 ? `J${results.cycleDay}` : "--"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                      <span className="text-gray-600">Cycle total</span>
                      <span className="text-xl font-bold text-gray-800">
                        {cycleData.cycleLength} jours
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                      <span className="text-gray-600">Phase lutéale</span>
                      <span className="text-xl font-bold text-indigo-600">
                        {cycleData.lutealPhaseLength} jours
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                      <span className="text-gray-600">Règles</span>
                      <span className="text-xl font-bold text-pink-600">
                        {cycleData.periodLength} jours
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-amber-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-amber-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-amber-400/20 flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-800 mb-2">Conseil</h4>
                      <p className="text-amber-700 text-sm">
                        La phase lutéale est généralement constante. Si votre
                        cycle varie, c'est souvent la phase folliculaire qui
                        change.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 p-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl shadow-sm">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-bold text-rose-800 mb-2">
                Avertissement médical
              </h4>
              <p className="text-rose-700">
                Cette application fournit des estimations basées sur des
                moyennes statistiques et ne remplace pas un avis médical
                professionnel. Consultez un professionnel de santé pour des
                conseils personnalisés et pour toute question concernant votre
                santé reproductive.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            <p>
              Cycle-nao by Ranto • Application de suivi menstruel •{" "}
              {currentYear || new Date().getFullYear()}
            </p>
            <p className="mt-2">Conçu avec soin pour votre bien-être</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CycleCalculator;
