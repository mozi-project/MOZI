import React, { useState } from 'react';
import { PhonemeSession } from '../types/index.ts';
import { soundManager } from '../utils/audio.ts';

export const TherapistDesk: React.FC = () => {
  const [activePhoneme, setActivePhoneme] = useState('/s/');
  const [soapNotes, setSoapNotes] = useState({
    subjective: 'Aarav entered the session motivated. Reported enjoying Sound Balloon Pop at home over the weekend.',
    objective: 'Targeted unvoiced alveolar fricative /s/ in initial positions. Achieved 84% accuracy across 50 trials. Lateral emission significantly reduced.',
    assessment: 'Interdental protrusion reduced from moderate to mild. Tongue tip stability behind alveolar ridge has improved with biofeedback.',
    plan: 'Introduce /s/ blends (sn-, sp-) and voiced /z/ contrast in next session. Continue daily home practice quests.'
  });
  const [savedAlert, setSavedAlert] = useState(false);

  const sessions: PhonemeSession[] = [
    {
      id: 'sess-4',
      date: 'Today, 10:15 AM',
      targetSound: '/s/ initial',
      accuracy: 84,
      wordsAttempted: 50,
      wordsCorrect: 42,
      notes: 'Crisp articulation on "Sun" and "Soup". Mild distortion on "Star".'
    },
    {
      id: 'sess-3',
      date: 'Yesterday, 3:30 PM',
      targetSound: '/s/ initial',
      accuracy: 78,
      wordsAttempted: 45,
      wordsCorrect: 35,
      notes: 'Demonstrated good self-correction when reminding of snake hiss cue.'
    },
    {
      id: 'sess-2',
      date: '3 days ago',
      targetSound: '/z/ voiced',
      accuracy: 72,
      wordsAttempted: 40,
      wordsCorrect: 29,
      notes: 'Initial confusion between voiced and unvoiced; bee motor tactile cue helped.'
    },
    {
      id: 'sess-1',
      date: 'Baseline Assessment',
      targetSound: '/s/ screening',
      accuracy: 42,
      wordsAttempted: 30,
      wordsCorrect: 13,
      notes: 'Interdental protrusion observed on 85% of initial /s/ productions.'
    }
  ];

  const handleSaveNotes = () => {
    setSavedAlert(true);
    soundManager.playRewardChime();
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-[4px] border-[1.5px] border-[#1F2A44] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-[#006A67]"></span>
            <span className="font-label-md text-xs uppercase tracking-wider text-[#006A67] font-bold">
              Clinician Dashboard
            </span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0F1B34] mt-1">
            Therapist Desk: Aarav Sharma
          </h2>
          <p className="font-body-md text-sm text-[#3D4948]">
            SLP Workstation &bull; Dr. Elena Vance, M.S., CCC-SLP &bull; Case #ARV-882
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#E9EDFF] rounded-[4px] border-[1.5px] border-[#1F2A44] text-center">
            <div className="text-[11px] font-bold text-[#006A67] uppercase">Accuracy Rating</div>
            <div className="font-display text-2xl text-[#0F1B34]">84%</div>
          </div>
          <div className="px-4 py-2 bg-[#FFDF9D] rounded-[4px] border-[1.5px] border-[#1F2A44] text-center">
            <div className="text-[11px] font-bold text-[#785900] uppercase">Target Mastery</div>
            <div className="font-display text-2xl text-[#251A00]">Level 4</div>
          </div>
        </div>
      </div>

      {/* Grid: Phoneme Radar & Prescribed Sound Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Target Sound Manager */}
        <div className="lg:col-span-5 bg-[#FAF8FF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44]">
          <h3 className="font-headline-md text-lg text-[#0F1B34] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006A67]">tune</span>
            Prescribed Phoneme Targets
          </h3>

          <div className="space-y-3">
            {[
              { phoneme: '/s/ initial', progress: 84, status: 'Active Focus', color: 'bg-[#13A4A0]' },
              { phoneme: '/s/ blends', progress: 62, status: 'Next Goal', color: 'bg-[#FF5D35]' },
              { phoneme: '/z/ voiced', progress: 76, status: 'Consolidation', color: 'bg-[#FFC531]' },
              { phoneme: '/r/ vocalic', progress: 25, status: 'Future Target', color: 'bg-gray-400' }
            ].map((p) => (
              <div
                key={p.phoneme}
                onClick={() => {
                  setActivePhoneme(p.phoneme);
                  soundManager.speak(p.phoneme);
                }}
                className={`p-3.5 rounded-[4px] border-[1.5px] border-[#1F2A44] cursor-pointer transition-all ${
                  activePhoneme === p.phoneme ? 'bg-[#FFFFFF] shadow-[0_3px_0_#1F2A44]' : 'bg-[#FFF4DC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display text-base text-[#0F1B34]">{p.phoneme}</span>
                  <span className="text-xs font-bold text-[#006A67]">{p.status}</span>
                </div>
                <div className="w-full bg-[#E9EDFF] h-3 rounded-full border border-[#1F2A44] overflow-hidden">
                  <div
                    style={{ width: `${p.progress}%` }}
                    className={`h-full ${p.color}`}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1 text-[11px] text-[#3D4948]">
                  <span>Baseline: 40%</span>
                  <span className="font-bold">{p.progress}% accuracy</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-[#E1E7FF] rounded-[4px] border border-[#1F2A44] text-xs text-[#0F1B34]">
            <strong>Clinical Note:</strong> Active targets sync automatically to Aarav's Sound Balloon Pop game and daily quests.
          </div>
        </div>

        {/* Right: Weekly Progress Trend Chart */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-md text-lg text-[#0F1B34] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B42801]">trending_up</span>
              Articulation Accuracy Curve (7 Days)
            </h3>
            <span className="text-xs font-bold text-[#006A67] bg-[#E9EDFF] px-2.5 py-1 rounded border border-[#1F2A44]">
              +42% Gain Since Intake
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 bg-[#FAF8FF] p-4 rounded-[4px] border-[1.5px] border-[#1F2A44] flex items-end justify-between gap-3">
            {[
              { day: 'Mon', acc: 55, trials: 30 },
              { day: 'Tue', acc: 62, trials: 40 },
              { day: 'Wed', acc: 68, trials: 45 },
              { day: 'Thu', acc: 74, trials: 50 },
              { day: 'Fri', acc: 78, trials: 48 },
              { day: 'Sat', acc: 81, trials: 35 },
              { day: 'Sun', acc: 84, trials: 55 }
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#006A67]">{d.acc}%</span>
                <div
                  style={{ height: `${d.acc}%` }}
                  className="w-full bg-[#13A4A0] rounded-t-[4px] border-[1.5px] border-[#1F2A44] relative group transition-all hover:bg-[#006A67]"
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2A44] text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-20">
                    {d.trials} Trials
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0F1B34]">{d.day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 text-center">
            <div className="p-2.5 bg-[#FFF4DC] rounded border border-[#1F2A44]">
              <div className="text-[11px] text-[#3D4948]">Total Trials</div>
              <div className="font-display text-lg text-[#0F1B34]">303</div>
            </div>
            <div className="p-2.5 bg-[#FFF4DC] rounded border border-[#1F2A44]">
              <div className="text-[11px] text-[#3D4948]">Self-Correction</div>
              <div className="font-display text-lg text-[#0F1B34]">76%</div>
            </div>
            <div className="p-2.5 bg-[#FFF4DC] rounded border border-[#1F2A44]">
              <div className="text-[11px] text-[#3D4948]">Streak</div>
              <div className="font-display text-lg text-[#006A67]">4 Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical SOAP Notes & Session Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOAP Notes Form */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-md text-lg text-[#0F1B34] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006A67]">edit_note</span>
              SLP Clinical Notes (SOAP Format)
            </h3>
            {savedAlert && (
              <span className="text-xs font-bold text-white bg-[#006A67] px-2.5 py-1 rounded">
                ✓ Saved to EHR
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#0F1B34] uppercase tracking-wider mb-1">
                S - Subjective
              </label>
              <textarea
                value={soapNotes.subjective}
                onChange={(e) => setSoapNotes({ ...soapNotes, subjective: e.target.value })}
                rows={2}
                className="w-full p-2.5 text-xs text-[#0F1B34] bg-[#FAF8FF] border-[1.5px] border-[#1F2A44] rounded-[4px] focus:outline-none focus:border-[#006A67]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F1B34] uppercase tracking-wider mb-1">
                O - Objective
              </label>
              <textarea
                value={soapNotes.objective}
                onChange={(e) => setSoapNotes({ ...soapNotes, objective: e.target.value })}
                rows={2}
                className="w-full p-2.5 text-xs text-[#0F1B34] bg-[#FAF8FF] border-[1.5px] border-[#1F2A44] rounded-[4px] focus:outline-none focus:border-[#006A67]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F1B34] uppercase tracking-wider mb-1">
                A - Assessment
              </label>
              <textarea
                value={soapNotes.assessment}
                onChange={(e) => setSoapNotes({ ...soapNotes, assessment: e.target.value })}
                rows={2}
                className="w-full p-2.5 text-xs text-[#0F1B34] bg-[#FAF8FF] border-[1.5px] border-[#1F2A44] rounded-[4px] focus:outline-none focus:border-[#006A67]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F1B34] uppercase tracking-wider mb-1">
                P - Plan
              </label>
              <textarea
                value={soapNotes.plan}
                onChange={(e) => setSoapNotes({ ...soapNotes, plan: e.target.value })}
                rows={2}
                className="w-full p-2.5 text-xs text-[#0F1B34] bg-[#FAF8FF] border-[1.5px] border-[#1F2A44] rounded-[4px] focus:outline-none focus:border-[#006A67]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => {
                soundManager.speak("SOAP notes draft exported.");
                alert("Clinical SOAP Note exported to clipboard / PDF summary.");
              }}
              className="px-4 py-2 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FFF4DC] hover:bg-[#FFDF9D] font-label-md text-xs font-bold cursor-pointer"
            >
              Export Report
            </button>
            <button
              onClick={handleSaveNotes}
              className="px-5 py-2 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#006A67] hover:bg-[#00504E] text-white font-label-md text-xs font-bold shadow-[0_2px_0_#1F2A44] cursor-pointer"
            >
              Save SOAP Notes
            </button>
          </div>
        </div>

        {/* Recent Session Attempt History */}
        <div className="lg:col-span-5 bg-[#FAF8FF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44]">
          <h3 className="font-headline-md text-lg text-[#0F1B34] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#13A4A0]">history</span>
            Session History Log
          </h3>

          <div className="space-y-3">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className="p-3 bg-[#FFFFFF] rounded-[4px] border-[1.5px] border-[#1F2A44]"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-md text-xs font-bold text-[#0F1B34]">
                    {sess.date}
                  </span>
                  <span className="text-xs font-extrabold text-[#006A67] bg-[#E9EDFF] px-2 py-0.5 rounded border border-[#1F2A44]">
                    {sess.accuracy}% Acc
                  </span>
                </div>
                <div className="text-xs text-[#006A67] font-bold">
                  Sound: {sess.targetSound} &bull; {sess.wordsCorrect}/{sess.wordsAttempted} trials
                </div>
                <p className="text-[11px] text-[#3D4948] mt-1">{sess.notes}</p>
                <button
                  onClick={() => {
                    soundManager.playSnakeHiss();
                    soundManager.speak(sess.notes);
                  }}
                  className="mt-2 text-[10px] text-[#B42801] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">play_circle</span>
                  Replay Audio Clip
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
