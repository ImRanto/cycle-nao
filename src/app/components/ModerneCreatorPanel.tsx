"use client";

import React, { useState } from "react";
import {
  User,
  Heart,
  X,
  Coffee,
  Mail,
  ChevronLeft,
  Github,
  Linkedin,
  ExternalLink,
  Zap,
  Crown,
} from "lucide-react";

interface ContactLinkProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
}

const ContactLink: React.FC<ContactLinkProps> = ({ icon, label, value, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 transition-colors duration-200 text-left"
  >
    <div className={`p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors duration-200 ${color}`}>
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-[9px] text-slate-400 uppercase tracking-tight">
        {label}
      </p>
      <p className="text-xs font-medium text-slate-700 truncate">{value}</p>
    </div>
    <ExternalLink
      size={12}
      className="text-slate-400 group-hover:text-purple-600 transition-colors duration-200"
    />
  </a>
);

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex-1 flex items-center justify-center p-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-900 hover:text-white transition-colors duration-200 shadow-xs"
  >
    {icon}
  </a>
);

export const ModernCreatorPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
      {!isOpen && (
        <div className="relative flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir le panneau du développeur"
            aria-expanded={isOpen}
            className="group relative bg-white border-l border-y border-slate-200 shadow-md pl-3 pr-2 py-4 rounded-l-xl transition-colors duration-200 hover:bg-slate-50"
          >
            <div className="flex flex-col items-center gap-2">
              <ChevronLeft className="w-4 h-4 text-purple-600" />
              <div className="relative">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                  <User size={16} />
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center border border-white">
                    <Crown size={7} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      <div
        className={`
          bg-white border-l border-y border-slate-200 shadow-lg
          rounded-l-2xl transition-all duration-300 ease-in-out overflow-hidden
          ${
            isOpen
              ? "w-[320px] sm:w-[360px] opacity-100 translate-x-0"
              : "w-0 opacity-0 translate-x-10 pointer-events-none"
          }
        `}
      >
        <div className="w-[320px] sm:w-[360px] p-6 relative">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le panneau"
            className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors duration-200"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col items-center text-center mt-2 mb-6">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-3 shadow-sm">
              <User size={28} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Ranto Handraina
            </h3>
            <p className="text-xs text-purple-600 font-medium">Développeur Full-Stack</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 mb-5 border border-slate-200">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Je conçois des applications qui allient beauté et utilité.
              Cycle-nao est mon engagement pour une santé mieux comprise."
            </p>
          </div>

          <div className="space-y-2 mb-5">
            <ContactLink
              icon={<Mail size={14} />}
              label="Email"
              value="hei.ranto.2@gmail.com"
              href="mailto:hei.ranto.2@gmail.com"
              color="text-purple-600"
            />
            <ContactLink
              icon={<Coffee size={14} />}
              label="Portfolio"
              value="ranto-io.vercel.app"
              href="https://ranto-io.vercel.app"
              color="text-amber-600"
            />
            <div className="flex gap-2">
              <SocialIcon
                icon={<Github size={16} />}
                href="https://github.com/ImRanto"
                label="Profil GitHub"
              />
              <SocialIcon
                icon={<Linkedin size={16} />}
                href="https://www.linkedin.com/in/handraina-ranto-78a00b299"
                label="Profil LinkedIn"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Heart size={11} className="text-rose-500 fill-rose-500" />
              <span>Fait avec passion • 2026</span>
            </div>
            <Zap size={12} className="text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
