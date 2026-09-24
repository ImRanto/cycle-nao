import React from "react";
import { Droplets, Sprout, Egg, Moon } from "lucide-react";
import { PhaseInfo } from "../types/cycle.types";

export const getPhaseInfo = (phaseKey: string): PhaseInfo => {
  const phases: Record<string, PhaseInfo> = {
    menstrual: {
      name: "Menstruelle",
      description: "Phase des règles",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <Droplets className="w-4 h-4" />,
      duration: 5,
    },
    follicular: {
      name: "Folliculaire",
      description: "Préparation à l'ovulation",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Sprout className="w-4 h-4" />,
      duration: 10,
    },
    ovulation: {
      name: "Ovulation",
      description: "Libération de l'ovule",
      color: "bg-pink-100 text-pink-800 border-pink-200",
      icon: <Egg className="w-4 h-4" />,
      duration: 1,
    },
    luteal: {
      name: "Lutéale",
      description: "Après l'ovulation",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: <Moon className="w-4 h-4" />,
      duration: 14,
    },
  };

  return phases[phaseKey] || phases.follicular;
};
