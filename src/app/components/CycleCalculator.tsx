"use client"

import React, { useState, useEffect } from "react";
import { CycleData, CycleResults } from "../types/cycle.types";
import {
  calculateCycle,
  formatDate,
  formatShortDate,
} from "../utils/cycleCalculations";
import CycleCalendar from "./CycleCalendar";
import CycleStats from "./CycleStats";
import PhaseIndicator from "./PhaseIndicator";
import { Calendar, Droplets, Moon, Save, Target, FileText, BarChart3, Lightbulb, AlertTriangle } from "lucide-react";

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
  const [isCalculated, setIsCalculated] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!todayStr) return;
    try {
      const savedData = localStorage.getItem("lastCycleData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setCycleData(parsedData);
        calculateAndSetResults(parsedData);
      } else {
        const defaultData = { ...cycleData, startDate: todayStr };
        setCycleData(defaultData);
        calculateAndSetResults(defaultData);
      }
    } catch (error) {
      console.error("Erreur lors de la lecture des données sauvegardées:", error);
      const defaultData = { ...cycleData, startDate: todayStr };
      calculateAndSetResults(defaultData);
    }
  }, [todayStr]);

  const calculateAndSetResults = (data: CycleData) => {
    const calculatedResults = calculateCycle(data);
    setResults(calculatedResults);
    setIsCalculated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    let newValue: string | number = value;
    if (type === "number") {
      newValue = Math.max(1, parseInt(value) || 0);
    }

    const updatedData = {
      ...cycleData,
      [name]: newValue,
    };

    if (name === "periodLength" && typeof newValue === "number") {
      updatedData.periodLength = Math.min(newValue, updatedData.cycleLength - 1);
    }
    if (name === "cycleLength" && typeof newValue === "number") {
      updatedData.periodLength = Math.min(cycleData.periodLength, newValue - 1);
    }

    setCycleData(updatedData);

    if (updatedData.startDate && updatedData.cycleLength > 1) {
      calculateAndSetResults(updatedData);
    }
  };

  const handleQuickSelect = (days: number) => {
    const updatedData = {
      ...cycleData,
      cycleLength: days,
      periodLength: Math.min(cycleData.periodLength, days - 1),
    };

    setCycleData(updatedData);
    calculateAndSetResults(updatedData);
  };

  const handleSave = () => {
    localStorage.setItem("lastCycleData", JSON.stringify(cycleData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const quickCycleOptions = [
    { days: 26, label: "Court" },
    { days: 28, label: "Standard" },
    { days: 30, label: "Long" },
    { days: 32, label: "Très long" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div id="calculator" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Calculateur de cycle
          </h2>
          <p className="text-gray-600 max-w-3xl">
            Saisissez les informations de vos dernières règles pour obtenir des prédictions sur votre prochain cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    Paramètres du cycle
                  </h3>
                  <p className="text-sm text-gray-500">
                    Saisie des informations de suivi
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-purple-100 shadow-sm">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Date de début des règles
                      </h3>
                      <p className="text-xs text-gray-500">Sélectionnez la date de vos dernières règles</p>
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
                      onChange={handleInputChange}
                      aria-label="Date de début des règles"
                      className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all text-base text-gray-800"
                      required
                    />
                    <div className="sm:w-48 p-3 bg-white rounded-xl border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Aujourd'hui</div>
                      <div className="font-bold text-gray-800 text-base mt-0.5">
                        {mounted ? todayDisplay : "\u00A0"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-violet-100 shadow-sm">
                        <Target className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Durée du cycle
                        </h3>
                        <p className="text-xs text-gray-500">Typiquement 28 jours</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-5">
                      <label htmlFor="cycleLength" className="text-sm text-gray-500">
                        Nombre de jours
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          id="cycleLength"
                          name="cycleLength"
                          min="22"
                          max="45"
                          value={cycleData.cycleLength}
                          onChange={handleInputChange}
                          aria-label="Durée du cycle en jours"
                          className="w-20 px-3 py-2 text-center text-xl font-bold text-purple-700 bg-white border border-purple-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all tabular-nums"
                        />
                        <span className="text-sm text-gray-400" aria-hidden="true">j</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {quickCycleOptions.map((option) => (
                        <button
                          key={option.days}
                          type="button"
                          onClick={() => handleQuickSelect(option.days)}
                          aria-label={`Cycle de ${option.days} jours - ${option.label}`}
                          aria-pressed={cycleData.cycleLength === option.days}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            cycleData.cycleLength === option.days
                              ? "bg-purple-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-rose-100 shadow-sm">
                        <Droplets className="w-5 h-5 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Durée des règles
                        </h3>
                        <p className="text-xs text-gray-500">Typiquement 3-7 jours</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-5">
                      <label htmlFor="periodLength" className="text-sm text-gray-500">
                        Nombre de jours
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          id="periodLength"
                          name="periodLength"
                          min="1"
                          max={cycleData.cycleLength - 1}
                          value={cycleData.periodLength}
                          onChange={handleInputChange}
                          aria-label="Durée des règles en jours"
                          className="w-20 px-3 py-2 text-center text-xl font-bold text-rose-600 bg-white border border-rose-200 rounded-lg focus:border-rose-500 focus:ring-1 focus:ring-rose-200 transition-all tabular-nums"
                        />
                        <span className="text-sm text-gray-400" aria-hidden="true">j</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-rose-100">
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                        Fin estimée
                      </div>
                      <div className="text-base font-bold text-rose-600">
                        {results ? formatShortDate(results.periodEndDate) : "\u00A0"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
                        <Moon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Phase lutéale</h3>
                        <p className="text-xs text-gray-500">Après l'ovulation · standard 14 jours</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-indigo-600 tabular-nums">
                        {cycleData.lutealPhaseLength}
                      </span>
                      <span className="text-sm font-medium text-gray-400">j</span>
                    </div>
                  </div>

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
                      onChange={handleInputChange}
                      aria-label="Durée de la phase lutéale en jours"
                      aria-valuemin={10}
                      aria-valuemax={18}
                      aria-valuenow={cycleData.lutealPhaseLength}
                      aria-valuetext={`${cycleData.lutealPhaseLength} jours`}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-2">
                    {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          const updatedData = { ...cycleData, lutealPhaseLength: val };
                          setCycleData(updatedData);
                          calculateAndSetResults(updatedData);
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          cycleData.lutealPhaseLength === val
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {isSaved ? (
                    <>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span>Préférences enregistrées</span>
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

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Aperçu du cycle
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="text-gray-600">Jour actuel</span>
                      <span className="font-bold text-purple-700">
                        {results.cycleDay > 0 ? `J${results.cycleDay}` : "--"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="text-gray-600">Durée totale</span>
                      <span className="font-bold text-gray-800">
                        {cycleData.cycleLength} jours
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="text-gray-600">Phase lutéale</span>
                      <span className="font-bold text-indigo-600">
                        {cycleData.lutealPhaseLength} jours
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="text-gray-600">Durée des règles</span>
                      <span className="font-bold text-rose-600">
                        {cycleData.periodLength} jours
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 text-sm mb-1">Information</h4>
                      <p className="text-amber-800 text-xs leading-relaxed">
                        La phase lutéale est généralement constante d'un cycle à l'autre. Les variations de durée de cycle proviennent le plus souvent de la phase folliculaire.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 p-5 bg-rose-50/80 border border-rose-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm mb-1">
                Avertissement médical
              </h4>
              <p className="text-rose-800 text-xs leading-relaxed">
                Les résultats affichés sont des estimations statistiques et ne constituent en aucun cas un diagnostic ou un avis médical. Pour des conseils adaptés à votre situation, consultez un professionnel de santé.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-xs space-y-1">
            <p>
              Cycle-nao • Suivi du cycle menstruel • {currentYear || new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CycleCalculator;
