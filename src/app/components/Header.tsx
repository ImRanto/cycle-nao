"use client";

import React from "react";
import { Calendar, Sparkles, ShieldCheck, Activity, Zap, Heart } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  badgeBg: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, badgeBg }) => (
  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl hover:bg-slate-800 transition-colors duration-200">
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 ${badgeBg} rounded-xl flex items-center justify-center`}>
        <div className="text-white">{icon}</div>
      </div>
      <div>
        <h3 className="font-bold text-white text-sm">{title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
      </div>
    </div>
  </div>
);

const Header: React.FC = () => {
  return (
    <header className="relative bg-slate-900 border-b border-slate-800 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6 text-slate-300">
              <div className="w-5 h-5 bg-emerald-600 rounded-md flex items-center justify-center">
                <Activity size={12} className="text-white" />
              </div>
              <span>Suivi simple & privé</span>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
              Cycle<span className="text-purple-400">-nao</span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Un moyen simple et clair pour suivre votre cycle menstruel et prévoir vos prochaines dates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-sm text-sm"
              >
                <Zap className="w-4 h-4" />
                Commencer maintenant
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                <Heart className="w-4 h-4 text-slate-400" />
                En savoir plus
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full max-w-sm">
            <FeatureCard
              icon={<Calendar size={20} />}
              title="Suivi du cycle"
              desc="Calcul automatique des dates"
              badgeBg="bg-indigo-600"
            />
            <FeatureCard
              icon={<Sparkles size={20} />}
              title="Repères visuels"
              desc="Visualisez clairement chaque phase"
              badgeBg="bg-amber-600"
            />
            <FeatureCard
              icon={<ShieldCheck size={20} />}
              title="Confidentialité"
              desc="Données stockées uniquement chez vous"
              badgeBg="bg-emerald-600"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
