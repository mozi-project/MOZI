import { useState } from "react";
import {
  Home,
  Dumbbell,
  BarChart3,
  User,
  Settings,
  Bell,
  Volume2,
  Mic,
  BookOpen,
  MessageCircle,
  Target,
  ChevronRight,
  Play,
  CheckCircle2,
  Calendar,
  Trophy,
  Clock,
  Flame,
} from "lucide-react";

/*
  ============================================================
  MOZI DASHBOARD
  ============================================================

  This file is kept intentionally simple.

  Later, when FastAPI is ready, replace the sample data below
  with API calls.

  Example:

  const response = await fetch("http://localhost:8000/api/dashboard");
  const data = await response.json();

  The UI does not need to change.
*/


// ============================================================
// API CONFIGURATION
// ============================================================

const API_URL = "http://localhost:8000";


// ============================================================
// SAMPLE DATA
// Replace this data with backend data later
// ============================================================

const user = {
  name: "Shreya",
  profileImage: null,
};

// Single source of truth for each skill's color, so the same skill
// is drawn with the same color everywhere it shows up (dashboard,
// recent exercises, progress breakdown) instead of three unrelated
// color choices for the same thing.
const skills = [
  {
    name: "Articulation",
    description: "Improve speech sounds",
    exercises: 12,
    icon: Volume2,
    color: "#FF6B4A",
    bg: "#FFE8E0",
  },
  {
    name: "Pronunciation",
    description: "Speak words clearly",
    exercises: 10,
    icon: Mic,
    color: "#1F9E96",
    bg: "#E1F3F1",
  },
  {
    name: "Vocabulary",
    description: "Build your word bank",
    exercises: 24,
    icon: BookOpen,
    color: "#C9890F",
    bg: "#FDF1DC",
  },
  {
    name: "Fluency",
    description: "Speak with confidence",
    exercises: 8,
    icon: MessageCircle,
    color: "#B5467A",
    bg: "#F8E6EF",
  },
];

const recentExercises = [
  {
    name: "Sound Practice",
    subtitle: "/R/ Sound",
    duration: "8 min",
    progress: 100,
    skill: "Articulation",
  },
  {
    name: "Word Builder",
    subtitle: "Everyday Words",
    duration: "10 min",
    progress: 70,
    skill: "Vocabulary",
  },
  {
    name: "Speak & Repeat",
    subtitle: "Sentence Practice",
    duration: "7 min",
    progress: 45,
    skill: "Fluency",
  },
];

const streakDays = 5;

const dailyGoal = {
  completedMinutes: 15,
  targetMinutes: 20,
};

const badgeProgress = {
  completed: 2,
  needed: 5,
  name: "Practice Star",
};

// small helper so recentExercises can just say "skill: 'Articulation'"
// and automatically pick up that skill's icon + color -- one place to
// change a color, not three.
function getSkill(name) {
  return skills.find((s) => s.name === name) ?? skills[0];
}


// ============================================================
// SIDEBAR
// ============================================================

function Sidebar({ activePage, setActivePage }) {
  const menu = [
    { name: "Home", icon: Home },
    { name: "Exercises", icon: Dumbbell },
    { name: "Progress", icon: BarChart3 },
    { name: "Profile", icon: User },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-[#ECE4DB] p-6 flex-col">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="font-display text-2xl font-bold text-[#2A2420]">
          Mozi
        </h1>

        <p className="text-[10px] text-[#87796F]">
          Speak, play, grow.
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition ${
                active
                  ? "bg-[#FFE8E0] text-[#E6522E] font-semibold"
                  : "text-[#87796F] hover:bg-[#FBF9F6]"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Bottom card -- now tied to the child's actual streak instead
          of a generic motivational placeholder */}
      <div className="mt-auto rounded-2xl p-4 bg-[#2A2420]">

        <div className="flex items-center gap-2">
          <Flame size={18} className="text-[#F6B93B]" />
          <p className="text-sm font-bold text-white">
            {streakDays}-day streak
          </p>
        </div>

        <p className="text-[11px] text-white/60 mt-2 leading-4">
          Practice today to keep it going.
        </p>

        <button
          onClick={() => setActivePage("Practice")}
          className="text-[11px] text-[#F6B93B] font-bold mt-3"
        >
          Start today's practice
        </button>
      </div>
    </aside>
  );
}


// ============================================================
// HEADER
// ============================================================

function Header() {
  return (
    <header className="h-[62px] border-b border-[#ECE4DB] flex items-center justify-between px-5 lg:px-7 bg-[#FBF9F6]">

      <div>
        <h2 className="font-display text-lg font-bold text-[#2A2420]">
          Hi, {user.name.split(" ")[0]} 👋
        </h2>

        <p className="text-[10px] text-[#87796F]">
          Ready to practice today?
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Notification */}
        <button className="relative w-9 h-9 rounded-xl bg-white border border-[#ECE4DB] flex items-center justify-center">
          <Bell size={17} className="text-[#87796F]" />

          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
        </button>

        {/* Profile */}
        <button className="w-9 h-9 rounded-xl bg-[#FFE8E0] text-[#E6522E] font-bold text-sm">
          {user.name.charAt(0)}
        </button>
      </div>
    </header>
  );
}


// ============================================================
// HERO
// ============================================================

function Hero() {
  return (
    <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#FF6B4A] to-[#F6B93B] p-7">

      <div className="relative max-w-[600px]">

        <div className="inline-flex items-center gap-1.5 bg-white/25 px-3 py-1.5 rounded-full text-[10px] font-bold text-white">
          <Flame size={12} />
          {streakDays}-day streak -- don't break it!
        </div>

        <h1 className="font-display text-3xl font-bold text-white mt-4">
          Ready for today's practice?
        </h1>

        <p className="text-sm text-white/85 mt-3 max-w-[500px]">
          Pick up your /R/ Sound exercise and keep building your streak.
        </p>

        <button
          className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl
          bg-white text-[#E6522E] text-xs font-bold
          hover:bg-white/90 transition"
        >
          <Play size={14} fill="#E6522E" />
          Start /R/ Sound Practice
        </button>
      </div>
    </div>
  );
}


// ============================================================
// CONTINUE PRACTICE
// ============================================================

function ContinuePractice() {
  return (
    <div className="bg-white border border-[#ECE4DB] rounded-2xl p-5">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="font-display text-lg font-bold text-[#2A2420]">
            Pick up where you left off
          </h2>
          <p className="text-[11px] text-[#87796F] mt-0.5">
            Articulation Practice
          </p>
        </div>

        <div className="w-9 h-9 rounded-xl bg-[#FFE8E0] flex items-center justify-center">
          <Volume2 size={17} className="text-[#FF6B4A]" />
        </div>
      </div>

      {/* Exercise */}
      <div className="mt-5 bg-[#FBF9F6] rounded-xl p-4">

        <div className="flex justify-between">

          <div>
            <p className="text-xs font-semibold text-[#2A2420]">
              /R/ Sound
            </p>

            <p className="text-[10px] text-[#87796F] mt-1">
              Level 4 - Intermediate
            </p>
          </div>

          <p className="text-xs font-bold text-[#FF6B4A]">
            70%
          </p>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-[#ECE4DB] rounded-full mt-3">
          <div
            className="h-full bg-[#FF6B4A] rounded-full"
            style={{ width: "70%" }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-[10px] text-[#87796F]">
            7 of 10 exercises
          </p>

          <p className="text-[10px] text-[#87796F]">
            3 remaining
          </p>
        </div>
      </div>

      <button className="w-full mt-4 py-3 rounded-xl bg-[#FF6B4A] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E6522E]">
        Continue
        <ChevronRight size={15} />
      </button>
    </div>
  );
}


// ============================================================
// SKILLS
// ============================================================

function Skills() {
  return (
    <div>

      <div className="flex justify-between items-end mb-4">
        <h2 className="font-display text-lg font-bold text-[#2A2420]">
          Your skills
        </h2>

        <button className="text-[11px] text-[#FF6B4A] font-bold">
          See all skills
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">

        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <button
              key={skill.name}
              className="bg-white border border-[#ECE4DB] rounded-2xl p-4 text-left hover:shadow-sm transition"
            >

              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: skill.bg }}
              >
                <Icon size={17} style={{ color: skill.color }} />
              </div>

              <h3 className="text-xs font-bold text-[#2A2420] mt-4">
                {skill.name}
              </h3>

              <p className="text-[10px] text-[#87796F] mt-1">
                {skill.description}
              </p>

              <div className="flex justify-between items-center mt-4">

                <span className="text-[9px] text-[#87796F]">
                  {skill.exercises} exercises
                </span>

                <ChevronRight
                  size={14}
                  style={{ color: skill.color }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


// ============================================================
// RECENT EXERCISES
// ============================================================

function RecentExercises() {
  return (
    <div>

      <div className="flex justify-between items-end mb-4">
        <h2 className="font-display text-lg font-bold text-[#2A2420]">
          Recent exercises
        </h2>

        <button className="text-[11px] text-[#FF6B4A] font-bold">
          See all exercises
        </button>
      </div>

      <div className="space-y-3">

        {recentExercises.map((exercise) => {
          const skill = getSkill(exercise.skill);
          const Icon = skill.icon;

          return (
            <div
              key={exercise.name}
              className="bg-white border border-[#ECE4DB] rounded-2xl p-4 flex items-center gap-3"
            >

              {/* Icon -- reuses the skill's own color, so "Word Builder"
                  always looks like Vocabulary everywhere it appears */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: skill.bg }}
              >
                <Icon size={17} style={{ color: skill.color }} />
              </div>

              {/* Details */}
              <div className="flex-1">

                <div className="flex justify-between">

                  <div>
                    <p className="text-xs font-bold text-[#2A2420]">
                      {exercise.name}
                    </p>

                    <p className="text-[10px] text-[#87796F] mt-0.5">
                      {exercise.subtitle}
                    </p>
                  </div>

                  {exercise.progress === 100 && (
                    <CheckCircle2
                      size={17}
                      className="text-[#4EAD78]"
                    />
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">

                  <div className="flex-1 h-1.5 bg-[#ECE4DB] rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${exercise.progress}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>

                  <span className="text-[9px] text-[#87796F] flex items-center gap-1">
                    <Clock size={10} />
                    {exercise.duration}
                  </span>
                </div>
              </div>

              {/* Play */}
              <button
                className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center"
                style={{ backgroundColor: skill.bg }}
              >
                <Play
                  size={13}
                  fill={skill.color}
                  style={{ color: skill.color }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ============================================================
// DAILY GOAL
// ============================================================

function DailyGoal() {
  const percent = Math.round(
    (dailyGoal.completedMinutes / dailyGoal.targetMinutes) * 100
  );
  const remaining = dailyGoal.targetMinutes - dailyGoal.completedMinutes;

  return (
    <div className="bg-white border border-[#ECE4DB] rounded-2xl p-5">

      <div className="flex justify-between">
        <h2 className="font-display text-lg font-bold text-[#2A2420]">
          Keep your streak
        </h2>

        <Target
          size={17}
          className="text-[#FF6B4A]"
        />
      </div>

      {/* Circle */}
      <div className="flex justify-center mt-6">

        <div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#FF6B4A 0deg ${percent * 3.6}deg, #ECE4DB ${percent * 3.6}deg)`,
          }}
        >
          <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center">

            <p className="text-xl font-bold text-[#2A2420]">
              {dailyGoal.completedMinutes}
            </p>

            <p className="text-[10px] text-[#87796F]">
              / {dailyGoal.targetMinutes} min
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">

        <p className="text-xs font-semibold text-[#2A2420]">
          {remaining} minutes to go!
        </p>

        <p className="text-[10px] text-[#87796F] mt-1">
          You are doing great today.
        </p>
      </div>
    </div>
  );
}


// ============================================================
// SPEECH PROGRESS
// ============================================================

function SpeechProgress() {
  return (
    <div className="bg-white border border-[#ECE4DB] rounded-2xl p-5">

      <div className="flex justify-between">
        <h2 className="font-display text-lg font-bold text-[#2A2420]">
          Speech progress
        </h2>

        <BarChart3
          size={17}
          className="text-[#4EAD78]"
        />
      </div>

      <div className="flex justify-between items-end mt-5">

        <div>
          <p className="text-2xl font-bold text-[#4EAD78]">
            78%
          </p>

          <p className="text-[10px] text-[#87796F]">
            Overall improvement
          </p>
        </div>

        <span className="text-[9px] font-semibold text-[#2F8A5B] bg-[#E4F6EC] px-2 py-1 rounded-full">
          +8% this month
        </span>
      </div>

      {/* Each skill's breakdown uses that same skill's color -- same
          fix as Recent Exercises, one color mapping for the whole app */}
      <ProgressBar name="Articulation" value={82} color={getSkill("Articulation").color} />
      <ProgressBar name="Pronunciation" value={76} color={getSkill("Pronunciation").color} />
      <ProgressBar name="Fluency" value={68} color={getSkill("Fluency").color} />
    </div>
  );
}


// ============================================================
// SIMPLE PROGRESS BAR
// ============================================================

function ProgressBar({ name, value, color }) {
  return (
    <div className="mt-4">

      <div className="flex justify-between mb-1">
        <span className="text-[10px] text-[#5A5047]">
          {name}
        </span>

        <span className="text-[10px] font-semibold text-[#2A2420]">
          {value}%
        </span>
      </div>

      <div className="h-1.5 bg-[#ECE4DB] rounded-full">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}


// ============================================================
// THERAPIST
// ============================================================

function Therapist() {
  return (
    <div className="bg-[#E1F3F1] rounded-2xl p-5">

      <div className="flex justify-between">

        <div>
          <h2 className="font-display text-base font-bold text-[#2A2420]">
            Dr. Ananya
          </h2>
          <p className="text-[10px] text-[#87796F] mt-0.5">
            Your therapist
          </p>
        </div>

        {/* Same initial-avatar treatment as the Header profile button,
            instead of a one-off emoji nothing else in the app uses */}
        <div className="w-10 h-10 rounded-full bg-[#1F9E96] text-white flex items-center justify-center font-bold text-sm">
          A
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-[10px] text-[#5A5047]">
        <CheckCircle2
          size={14}
          className="text-[#1F9E96]"
        />
        Feedback available
      </div>

      <button className="w-full bg-white rounded-xl py-2.5 mt-4 text-[10px] font-bold text-[#1F9E96]">
        View Feedback
      </button>
    </div>
  );
}


// ============================================================
// REWARD
// ============================================================

function Reward() {
  return (
    <div className="relative bg-gradient-to-br from-[#F6B93B] to-[#E6522E] rounded-[28px] p-5 overflow-hidden">

      <Trophy size={64} className="absolute -right-3 -bottom-3 text-white/15" />

      <p className="text-[11px] font-bold text-white/80">
        Latest reward
      </p>
      <h2 className="font-display text-xl font-bold text-white mt-0.5">
        {badgeProgress.name}
      </h2>

      <p className="text-[11px] text-white/85 mt-3 leading-4 relative">
        {badgeProgress.needed - badgeProgress.completed} more exercises to your next badge
      </p>

      {/* Progress shown as filled pips -- feels like a game reward
          tracker, not a generic data progress bar */}
      <div className="flex gap-1.5 mt-4 relative">
        {Array.from({ length: badgeProgress.needed }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < badgeProgress.completed ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


// ============================================================
// NEXT SESSION
// ============================================================

function NextSession() {
  return (
    <div className="bg-white border border-[#ECE4DB] rounded-2xl p-5">

      <div className="flex justify-between">
        <h2 className="font-display text-base font-bold text-[#2A2420]">
          Therapist session
        </h2>

        <Calendar
          size={17}
          className="text-[#1F9E96]"
        />
      </div>

      <div className="bg-[#E1F3F1] rounded-xl p-3 mt-4 flex items-center gap-3">

        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
          <Calendar
            size={16}
            className="text-[#1F9E96]"
          />
        </div>

        <div>
          <p className="text-xs font-bold text-[#2A2420]">
            Tomorrow
          </p>

          <p className="text-[10px] text-[#87796F] mt-1">
            4:00 PM - 30 minutes
          </p>
        </div>
      </div>

      <button className="w-full border border-[#D9EEEC] rounded-xl py-2.5 mt-3 text-[10px] font-bold text-[#1F9E96]">
        View Session
      </button>
    </div>
  );
}


// ============================================================
// MOBILE NAVIGATION
// ============================================================

function MobileNavigation({ activePage, setActivePage }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#ECE4DB] z-50">

      <div className="flex justify-around items-center py-2">

        <MobileButton
          name="Home"
          icon={Home}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <MobileButton
          name="Exercises"
          icon={Dumbbell}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <button
          onClick={() => setActivePage("Practice")}
          className="w-12 h-12 rounded-full bg-[#FF6B4A] text-white flex items-center justify-center -mt-6 shadow-lg"
        >
          <Mic size={20} />
        </button>

        <MobileButton
          name="Progress"
          icon={BarChart3}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <MobileButton
          name="Profile"
          icon={User}
          activePage={activePage}
          setActivePage={setActivePage}
        />

      </div>
    </div>
  );
}


function MobileButton({
  name,
  icon: Icon,
  activePage,
  setActivePage,
}) {
  const active = activePage === name;

  return (
    <button
      onClick={() => setActivePage(name)}
      className={`flex flex-col items-center gap-1 ${
        active ? "text-[#FF6B4A]" : "text-[#87796F]"
      }`}
    >
      <Icon size={18} />

      <span className="text-[9px]">
        {name}
      </span>
    </button>
  );
}


// ============================================================
// DASHBOARD
// ============================================================

function Dashboard() {
  return (
    <div className="space-y-5">

      {/* Hero */}
      <Hero />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">

        {/* LEFT */}
        <div className="space-y-5">

          <ContinuePractice />

          <Skills />

          <RecentExercises />

        </div>

        {/* RIGHT */}
        <div className="space-y-5">

          <DailyGoal />

          <SpeechProgress />

          <Therapist />

          <Reward />

          <NextSession />

        </div>

      </div>
    </div>
  );
}


// ============================================================
// SIMPLE OTHER PAGE
// ============================================================

function OtherPage({ name }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">

      <div className="text-center">

        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFE8E0] flex items-center justify-center">
          {name === "Exercises" && (
            <Dumbbell className="text-[#FF6B4A]" />
          )}

          {name === "Progress" && (
            <BarChart3 className="text-[#FF6B4A]" />
          )}

          {name === "Profile" && (
            <User className="text-[#FF6B4A]" />
          )}

          {name === "Settings" && (
            <Settings className="text-[#FF6B4A]" />
          )}
        </div>

        <h1 className="font-display text-xl font-bold text-[#2A2420] mt-4">
          {name}
        </h1>

        <p className="text-sm text-[#87796F] mt-2">
          This page will be connected to the backend.
        </p>
      </div>
    </div>
  );
}


// ============================================================
// APP
// ============================================================

export default function App() {

  const [activePage, setActivePage] = useState("Home");


  function showPage() {

    if (activePage === "Home") {
      return <Dashboard />;
    }

    if (activePage === "Practice") {
      return <OtherPage name="Practice" />;
    }

    return <OtherPage name={activePage} />;
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6]">

      {/* Desktop Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main */}
      <div className="lg:ml-[220px]">

        {/* Header */}
        <Header />

        {/* Content */}
        <main className="p-4 sm:p-5 lg:p-7 pb-24 lg:pb-7 max-w-[1500px] mx-auto">
          {showPage()}
        </main>

      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation
        activePage={activePage}
        setActivePage={setActivePage}
      />

    </div>
  );
}
