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

export const ModernCreatorPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleOpen = () => {
    setIsExpanded(true);
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
      {!isExpanded && (
        <div className="relative flex items-center">
          <button
            onClick={handleOpen}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Ouvrir le panneau du développeur"
            aria-expanded={isExpanded}
            className="group relative bg-white border-l border-y border-gray-100 shadow-lg pl-4 pr-2 py-5 rounded-l-2xl transition-all duration-500 hover:pl-6 hover:bg-gray-50 active:scale-95"
          >
            <div className="flex flex-col items-center gap-3">
              <ChevronLeft
                className={`w-4 h-4 text-purple-400 transition-transform duration-500 ${
                  isHovering ? "-translate-x-1" : ""
                }`}
              />

              <div className="relative">
                <div className="w-9 h-9 bg-linear-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <User size={18} />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <Crown size={8} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      <div
        className={`
          bg-white border-l border-y border-gray-200 shadow-xl
          rounded-l-2xl transition-all duration-500 ease-in-out overflow-hidden
          ${
            isExpanded
              ? "w-[320px] sm:w-[360px] opacity-100 translate-x-0"
              : "w-0 opacity-0 translate-x-10 pointer-events-none"
          }
        `}
      >
        <div className="w-[320px] sm:w-[360px] p-6 relative">
          <button
            onClick={() => setIsExpanded(false)}
            aria-label="Fermer le panneau"
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col items-center text-center mt-2 mb-6">
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow mb-3">
              <User size={28} />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Ranto Handraina
            </h3>
            <p className="text-xs text-purple-600 font-medium">Développeur Web</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3.5 mb-5 border border-gray-100">
            <p className="text-xs text-gray-600 leading-relaxed">
              Cycle-nao est un calculateur de cycle menstruel conçu pour offrir des prédictions claires et confidentielles.
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
              color="text-orange-500"
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

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Cycle-nao © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactLink = ({ icon, label, value, href, color }: { icon: React.ReactNode; label: string; value: string; href: string; color: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-purple-200 transition-all text-left"
  >
    <div
      className={`p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors ${color}`}
    >
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-[9px] text-gray-400 uppercase tracking-tight">
        {label}
      </p>
      <p className="text-xs font-medium text-gray-700 truncate">{value}</p>
    </div>
    <ExternalLink
      size={12}
      className="text-gray-300 group-hover:text-purple-400 transition-colors"
    />
  </a>
);

const SocialIcon = ({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex-1 flex items-center justify-center p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-gray-900 hover:text-white transition-all shadow-sm"
  >
    {icon}
  </a>
);
