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
  Check,
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
    <div id="calculator" className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Calculateur de Cycle Intelligent
          </h1>
          <p className="text-slate-600 max-w-3xl text-sm md:text-base">
            Suivez votre cycle menstruel avec précision. Calculs automatiques,
            prédictions fiables et interface sobre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
              <div className="flex items-center mb-6 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white mr-4 shadow-xs">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Informations du cycle
                  </h2>
                  <p className="text-xs text-slate-500">
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
                  className="w-full py-3.5 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer text-sm md:text-base"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-5 h-5 text-white" />
                      <span>Enregistré !</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 text-white" />
                      <span>Enregistrer mes préférences</span>
                    </>
                  )}
                </button>
              </form>
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

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                    <BarChart3 className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-bold text-slate-900">
                      Statistiques du cycle
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-sm text-slate-600 font-medium">Jour actuel</span>
                      <span className="text-xl font-bold text-purple-600">
                        {results.cycleDay > 0 ? `J${results.cycleDay}` : "--"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-sm text-slate-600 font-medium">Cycle total</span>
                      <span className="text-base font-bold text-slate-800">
                        {cycleData.cycleLength} jours
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-sm text-slate-600 font-medium">Phase lutéale</span>
                      <span className="text-base font-bold text-indigo-600">
                        {cycleData.lutealPhaseLength} jours
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-sm text-slate-600 font-medium">Règles</span>
                      <span className="text-base font-bold text-pink-600">
                        {cycleData.periodLength} jours
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-amber-200">
                      <Lightbulb className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm mb-1">Conseil</h4>
                      <p className="text-amber-800 text-xs leading-relaxed">
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

        <div className="mt-12 p-6 bg-rose-50/80 border border-rose-200 rounded-2xl shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-rose-200">
              <AlertTriangle className="w-5 h-5 text-rose-700" />
            </div>
            <div>
              <h4 className="font-bold text-rose-900 text-sm mb-1">
                Avertissement médical
              </h4>
              <p className="text-rose-800 text-xs leading-relaxed">
                Cette application fournit des estimations basées sur des
                moyennes statistiques et ne remplace pas un avis médical
                professionnel. Consultez un professionnel de santé pour des
                conseils personnalisés et pour toute question concernant votre
                santé reproductive.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <div className="text-center text-slate-500 text-xs">
            <p>
              Cycle-nao by Ranto • Application de suivi menstruel •{" "}
              {currentYear || new Date().getFullYear()}
            </p>
            <p className="mt-1">Conçu avec soin pour votre bien-être</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CycleCalculator;
