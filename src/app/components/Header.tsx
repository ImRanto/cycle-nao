"use client";

import React from "react";
import { Calendar, Sparkles, ShieldCheck, Activity, Zap, Heart } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-slate-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              <span className="text-white/90">Données stockées uniquement sur votre appareil</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
              Cycle<span className="text-pink-300">-nao</span>
            </h1>

            <p className="text-base md:text-lg text-purple-100/80 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Suivi du cycle menstruel simple, confidentiel et intuitif. Calculez l'ovulation et anticipez vos phases en toute sérénité.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-purple-900 font-semibold rounded-xl shadow-md hover:bg-purple-50 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Accéder au calculateur
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full max-w-sm">
            <FeatureItem
              icon={<Calendar size={20} />}
              title="Calcul du cycle"
              desc="Estimation précise de la durée et des dates"
            />
            <FeatureItem
              icon={<Sparkles size={20} />}
              title="Prédictions"
              desc="Visualisation claire de la période fertile"
            />
            <FeatureItem
              icon={<ShieldCheck size={20} />}
              title="Confidentialité"
              desc="Pas de compte requis, 100% local"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 108C120 96 240 72 360 66C480 60 600 72 720 78C840 84 960 84 1080 78C1200 72 1320 60 1380 54L1440 48V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
          <path
            d="M0 120L60 114C120 108 240 96 360 90C480 84 600 84 720 90C840 96 960 108 1080 108C1200 108 1320 96 1380 90L1440 84V120H0Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </header>
  );
};

const FeatureItem = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-3.5">
    <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center text-white shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-white text-sm">{title}</h3>
      <p className="text-xs text-white/70 mt-0.5">{desc}</p>
    </div>
  </div>
);

export default Header;
