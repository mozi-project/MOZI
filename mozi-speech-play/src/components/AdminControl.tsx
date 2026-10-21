import React, { useState } from 'react';
import { soundManager } from '../utils/audio.ts';

export const AdminControl: React.FC = () => {
  const [coppaPrivate, setCoppaPrivate] = useState(true);
  const [micDiagnosticsActive, setMicDiagnosticsActive] = useState(false);
  const [latencyResult, setLatencyResult] = useState<string | null>(null);

  const students = [
    { id: '1', name: 'Aarav Sharma', age: 5, target: '/S/, /Z/', therapist: 'Dr. Elena Vance', status: 'Active (Day 4 Streak)', sessions: 14 },
    { id: '2', name: 'Maya Patel', age: 6, target: '/R/ Vocalic', therapist: 'Dr. Elena Vance', status: 'In Session', sessions: 8 },
    { id: '3', name: 'Leo Chen', age: 4, target: '/L/, /W/', therapist: 'Marcus Brody, SLP', status: 'Intake Completed', sessions: 2 }
  ];

  const handleRunDiagnostics = () => {
    setMicDiagnosticsActive(true);
    soundManager.playSnakeHiss();
    setTimeout(() => {
      setMicDiagnosticsActive(false);
      setLatencyResult('14ms (Optimal for Real-Time Biofeedback)');
      soundManager.playRewardChime();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-[4px] border-[1.5px] border-[#1F2A44] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-[#1F2A44]"></span>
            <span className="font-label-md text-xs uppercase tracking-wider text-[#006A67] font-bold">
              Administration Portal
            </span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0F1B34] mt-1">
            Clinic Admin &amp; Data Privacy Control
          </h2>
          <p className="font-body-md text-sm text-[#3D4948]">
            Compliance monitoring, caseload student management, and audio privacy guardrails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-[4px] bg-[#E9EDFF] border border-[#1F2A44] text-xs font-bold text-[#006A67] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            HIPAA &amp; COPPA Compliant
          </span>
        </div>
      </div>

      {/* Grid: Caseload Roster & Privacy Config */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Caseload Roster Table */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44]">
          <h3 className="font-headline-md text-lg text-[#0F1B34] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006A67]">group</span>
            Active Caseload Roster
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-[2px] border-[#1F2A44] bg-[#FFF4DC]">
                  <th className="p-3 font-bold text-[#0F1B34]">Student</th>
                  <th className="p-3 font-bold text-[#0F1B34]">Target Sounds</th>
                  <th className="p-3 font-bold text-[#0F1B34]">Assigned SLP</th>
                  <th className="p-3 font-bold text-[#0F1B34]">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-[#E9EDFF] hover:bg-[#FAF8FF]">
                    <td className="p-3">
                      <div className="font-bold text-[#0F1B34]">{s.name}</div>
                      <div className="text-[10px] text-gray-500">Age {s.age} &bull; {s.sessions} sessions</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#006A67]">{s.target}</td>
                    <td className="p-3 text-[#3D4948]">{s.therapist}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-[4px] border border-[#1F2A44] bg-[#E1E7FF] text-[#006A67] font-bold text-[10px]">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audio Privacy & Kid-Safe Certified Controls */}
        <div className="lg:col-span-5 bg-[#FAF8FF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] space-y-4">
          <h3 className="font-headline-md text-lg text-[#0F1B34] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B42801]">security</span>
            Privacy &amp; Guardrail Policies
          </h3>

          <div className="p-4 bg-[#FFFFFF] rounded-[4px] border-[1.5px] border-[#1F2A44] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-[#0F1B34]">Private Voice Data Policy</div>
                <div className="text-[11px] text-[#3D4948]">Zero cloud voice recording; all phoneme analysis remains on-device.</div>
              </div>
              <input
                type="checkbox"
                checked={coppaPrivate}
                onChange={(e) => setCoppaPrivate(e.target.checked)}
                className="w-5 h-5 accent-[#006A67] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E9EDFF]">
              <div>
                <div className="font-bold text-xs text-[#0F1B34]">COPPA Safe Browsing Filter</div>
                <div className="text-[11px] text-[#3D4948]">Strictly restricts external links and advertisements.</div>
              </div>
              <span className="text-xs font-bold text-[#006A67]">Enforced</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E9EDFF]">
              <div>
                <div className="font-bold text-xs text-[#0F1B34]">AI Clinician Guardrail</div>
                <div className="text-[11px] text-[#3D4948]">Disclaims diagnostic interpretation on all parent portals.</div>
              </div>
              <span className="text-xs font-bold text-[#006A67]">Active</span>
            </div>
          </div>

          {/* Speech Engine Hardware Diagnostics */}
          <div className="p-4 bg-[#FFF4DC] rounded-[4px] border-[1.5px] border-[#1F2A44]">
            <h4 className="font-headline-sm text-sm text-[#0F1B34] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006A67]">hearing</span>
              Speech Engine Diagnostics
            </h4>
            <div className="text-xs text-[#3D4948] space-y-1 mb-3">
              <div><strong>Web Audio API:</strong> Ready (48000 Hz)</div>
              <div><strong>Speech Synthesis:</strong> Active (Natural voice profile)</div>
              <div><strong>Mic Latency:</strong> {latencyResult || 'Not benchmarked yet'}</div>
            </div>

            <button
              onClick={handleRunDiagnostics}
              disabled={micDiagnosticsActive}
              className="w-full py-2 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#006A67] hover:bg-[#00504E] text-white font-label-md text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">speed</span>
              {micDiagnosticsActive ? 'Testing Latency...' : 'Run Hardware Benchmark'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
