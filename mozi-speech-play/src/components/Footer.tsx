import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FFF4DC] border-t-[1.5px] border-[#1F2A44] py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Clinician Guardrail */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[4px] bg-[#FF5D35] border-[1.5px] border-[#1F2A44] flex items-center justify-center shrink-0 shadow-none">
            <span className="material-symbols-outlined text-[#FFFFFF] text-[20px]">verified</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-label-md text-sm text-[#0F1B34] font-bold">Mozi Clinician Guardrail</span>
            <p className="font-body-md text-xs sm:text-sm text-[#3D4948] max-w-md">
              AI-assisted content is a draft for fun speech exploration, not a medical diagnosis.
            </p>
          </div>
        </div>

        {/* Security & Compliance Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FAF8FF] font-label-md text-xs text-[#0F1B34] flex items-center gap-1.5 shadow-none">
            <span className="material-symbols-outlined text-[16px] text-[#1F2A44]">child_care</span>
            Kid-Safe Certified
          </span>
          <span className="px-3 py-1 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FAF8FF] font-label-md text-xs text-[#0F1B34] flex items-center gap-1.5 shadow-none">
            <span className="material-symbols-outlined text-[16px] text-[#1F2A44]">lock</span>
            COPPA Compliant
          </span>
          <span className="px-3 py-1 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FAF8FF] font-label-md text-xs text-[#0F1B34] flex items-center gap-1.5 shadow-none">
            <span className="material-symbols-outlined text-[16px] text-[#1F2A44]">mic</span>
            Private Voice Data
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 text-center border-t border-[#BCC9C8]/40 mt-6">
        <p className="font-body-md text-xs sm:text-sm text-[#3D4948]">
          © 2025 Mozi Speech Interactive Inc. Designed for joyful speech articulation.
        </p>
      </div>
    </footer>
  );
};
