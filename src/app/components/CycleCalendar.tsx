"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Droplets,
  Egg,
  CircleDot,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MonthlyCalendarDay, CycleResults } from "../types/cycle.types";
import { generateMonthlyCalendar } from "../utils/cycleCalculations";

interface CycleCalendarProps {
  startDate: string;
  cycleLength: number;
  periodLength: number;
  results: CycleResults | null;
}

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface LegendItemProps {
  color: string;
  icon: React.ReactNode;
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, icon, label }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-6 h-6 rounded-lg flex items-center justify-center ${color}`}
    >
      {icon}
    </div>
    <span className="text-xs text-slate-600 font-medium">{label}</span>
  </div>
);

const CycleCalendar: React.FC<CycleCalendarProps> = ({
  startDate,
  cycleLength,
  periodLength,
  results,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  if (!results || !startDate || !cycleLength || !periodLength) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-purple-600 rounded-xl text-white">
            <CalendarDays className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Calendrier du cycle
          </h3>
        </div>
        <div className="text-center text-slate-500 py-8">
          <div className="w-8 h-8 border-3 border-t-purple-600 border-slate-200 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">Chargement du calendrier...</p>
        </div>
      </div>
    );
  }

  let calendarDays: MonthlyCalendarDay[] = [];
  try {
    calendarDays = generateMonthlyCalendar(
      currentYear,
      currentMonth,
      startDate,
      cycleLength,
      periodLength,
      results.lutealPhaseLength
    );
  } catch (error) {
    console.error("Erreur lors de la génération du calendrier:", error);
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-rose-600 rounded-xl text-white">
            <CalendarDays className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Calendrier du cycle
          </h3>
        </div>
        <div className="text-center text-rose-600 py-8">
          <p className="text-sm">Erreur lors du chargement du calendrier</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-700 transition-colors duration-200"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }

  if (!Array.isArray(calendarDays) || calendarDays.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div className="text-center text-slate-500 py-8">
          <Calendar className="w-10 h-10 mx-auto mb-3 text-slate-400" />
          <p className="text-sm">Aucune donnée de calendrier disponible</p>
        </div>
      </div>
    );
  }

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const getDayColor = (day: MonthlyCalendarDay): string => {
    if (!day.isCurrentMonth) return "bg-slate-50 text-slate-300";
    if (day.isOvulation)
      return "bg-pink-600 text-white font-semibold";
    if (day.isFertile)
      return "bg-emerald-50 text-emerald-800 border border-emerald-200";
    if (day.isPeriod)
      return "bg-rose-50 text-rose-800 border border-rose-200";
    if (day.isToday)
      return "bg-purple-50 text-purple-800 border border-purple-300 font-semibold";
    if (day.isWeekend) return "bg-slate-50 text-slate-600";
    return "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100";
  };

  const getDayIcon = (day: MonthlyCalendarDay) => {
    if (day.isOvulation) return <Egg className="w-3 h-3 text-white" />;
    if (day.isPeriod) return <Droplets className="w-3 h-3 text-rose-600" />;
    if (day.isFertile) return <CircleDot className="w-3 h-3 text-emerald-600" />;
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-600 rounded-xl text-white shadow-xs">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Calendrier du cycle
            </h3>
            <p className="text-slate-500 text-xs">Visualisation mensuelle</p>
          </div>
        </div>
        <div className="text-xs bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full font-semibold">
          {cycleLength} jours
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200 text-slate-600 cursor-pointer"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <h4 className="text-lg font-bold text-slate-900">
            {MONTHS[currentMonth]} {currentYear}
          </h4>
          <button
            onClick={goToToday}
            className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-lg hover:bg-purple-100 transition-colors duration-200 font-medium cursor-pointer"
          >
            Aujourd'hui
          </button>
        </div>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200 text-slate-600 cursor-pointer"
          aria-label="Mois suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2" role="row">
        {WEEKDAYS.map((dayName, index) => (
          <div
            key={index}
            className={`text-center font-bold py-1.5 text-xs ${
              index >= 5 ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Calendrier du cycle">
        {calendarDays.map((dayItem, index) => {
          const icon = getDayIcon(dayItem);

          return (
            <div
              key={`${dayItem.date}-${index}`}
              role="gridcell"
              aria-label={`${dayItem.dayOfMonth} ${MONTHS[currentMonth]}${dayItem.isOvulation ? " - Ovulation" : ""}${dayItem.isFertile ? " - Jour fertile" : ""}${dayItem.isPeriod ? " - Règles" : ""}${dayItem.isToday ? " - Aujourd\u2019hui" : ""}`}
              className={`
                relative p-2 rounded-xl text-center transition-colors duration-200 cursor-default
                ${getDayColor(dayItem)}
                ${dayItem.isCurrentMonth ? "" : "opacity-40"}
              `}
            >
              <div
                className={`font-bold text-xs md:text-sm mb-0.5 ${
                  dayItem.isToday && !dayItem.isOvulation
                    ? "bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center mx-auto"
                    : ""
                }`}
              >
                {dayItem.dayOfMonth}
              </div>

              {dayItem.cycleDay > 0 && dayItem.isCurrentMonth && (
                <div
                  className={`text-[9px] mb-0.5 ${
                    dayItem.isOvulation ? "text-white/90" : "text-slate-400"
                  }`}
                >
                  J{dayItem.cycleDay}
                </div>
              )}

              {icon && dayItem.isCurrentMonth && (
                <div className="flex justify-center mt-0.5">{icon}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5 mt-5 border-t border-slate-100">
        <LegendItem
          color="bg-rose-50 border border-rose-200"
          icon={<Droplets className="w-3.5 h-3.5 text-rose-600" />}
          label="Règles"
        />
        <LegendItem
          color="bg-emerald-50 border border-emerald-200"
          icon={<CircleDot className="w-3.5 h-3.5 text-emerald-600" />}
          label="Fertile"
        />
        <LegendItem
          color="bg-pink-600"
          icon={<Egg className="w-3.5 h-3.5 text-white" />}
          label="Ovulation"
        />
        <LegendItem
          color="bg-purple-50 border border-purple-300"
          icon={<div className="w-2 h-2 bg-purple-600 rounded-full" />}
          label="Aujourd'hui"
        />
      </div>

      <div className="mt-5 pt-5 border-t border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <div className="text-[11px] text-slate-500 font-medium">Période fertile</div>
            <div className="font-bold text-slate-900 text-xs md:text-sm mt-0.5">
              {new Date(results.fertileWindow.start).getDate()} -{" "}
              {new Date(results.fertileWindow.end).getDate()}{" "}
              {MONTHS[new Date(results.fertileWindow.start).getMonth()]
                .slice(0, 3)
                .toLowerCase()}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <div className="text-[11px] text-slate-500 font-medium">Ovulation</div>
            <div className="font-bold text-slate-900 text-xs md:text-sm mt-0.5">
              {new Date(results.ovulationDate).getDate()}{" "}
              {MONTHS[new Date(results.ovulationDate).getMonth()]
                .slice(0, 3)
                .toLowerCase()}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <div className="text-[11px] text-slate-500 font-medium">Prochaines règles</div>
            <div className="font-bold text-slate-900 text-xs md:text-sm mt-0.5">
              {new Date(results.nextPeriod).getDate()}{" "}
              {MONTHS[new Date(results.nextPeriod).getMonth()]
                .slice(0, 3)
                .toLowerCase()}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <div className="text-[11px] text-slate-500 font-medium">Cycle actuel</div>
            <div className="font-bold text-slate-900 text-xs md:text-sm mt-0.5">
              J{results.cycleDay > 0 ? results.cycleDay : "--"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleCalendar;
