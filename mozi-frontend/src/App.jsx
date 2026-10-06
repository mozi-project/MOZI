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
  Sparkles,
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

const skills = [
  {
    name: "Articulation",
    description: "Improve speech sounds",
    exercises: 12,
    icon: Volume2,
    color: "#7C5CFC",
    bg: "#EEE9FF",
  },
  {
    name: "Pronunciation",
    description: "Speak words clearly",
    exercises: 10,
    icon: Mic,
    color: "#4EAD78",
    bg: "#E4F6EC",
  },
  {
    name: "Vocabulary",
    description: "Build your word bank",
    exercises: 24,
    icon: BookOpen,
    color: "#D39E24",
    bg: "#FFF4D6",
  },
  {
    name: "Fluency",
    description: "Speak with confidence",
    exercises: 8,
    icon: MessageCircle,
    color: "#D77BA7",
    bg: "#FCEAF3",
  },
];

const recentExercises = [
  {
    name: "Sound Practice",
    subtitle: "/R/ Sound",
    duration: "8 min",
    progress: 100,
    icon: Volume2,
    color: "#7C5CFC",
    bg: "#EEE9FF",
  },
  {
    name: "Word Builder",
    subtitle: "Everyday Words",
    duration: "10 min",
    progress: 70,
    icon: BookOpen,
    color: "#4EAD78",
    bg: "#E4F6EC",
  },
  {
    name: "Speak & Repeat",
    subtitle: "Sentence Practice",
    duration: "7 min",
    progress: 45,
    icon: Mic,
    color: "#D77BA7",
    bg: "#FCEAF3",
  },
];


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
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-[#EAE5F2] p-6 flex-col">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-[#302A3D]">
          MOZI
        </h1>

        <p className="text-[10px] text-[#81788F]">
          Speech Therapy
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
                  ? "bg-[#F0EBFF] text-[#7C5CFC]"
                  : "text-[#81788F] hover:bg-[#F8F6FF]"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Bottom card */}
      <div className="mt-auto rounded-2xl p-4 bg-gradient-to-br from-[#F2EEFF] to-[#E8F7EF]">

        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-3">
          <Sparkles size={17} className="text-[#7C5CFC]" />
        </div>

        <p className="text-xs font-semibold text-[#302A3D]">
          Keep practicing!
        </p>

        <p className="text-[11px] text-[#81788F] mt-1 leading-4">
          Small steps every day make a big difference.
        </p>

        <button className="text-[11px] text-[#7C5CFC] font-semibold mt-3">
          Start today's practice →
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
    <header className="h-[62px] border-b border-[#EAE5F2] flex items-center justify-between px-5 lg:px-7 bg-[#F8F7FC]">

      <div>
        <h2 className="text-lg font-bold text-[#302A3D]">
          Dashboard
        </h2>

        <p className="text-[10px] text-[#81788F]">
          Continue your speech journey
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Notification */}
        <button className="relative w-9 h-9 rounded-xl bg-white border border-[#EAE5F2] flex items-center justify-center">
          <Bell size={17} className="text-[#81788F]" />

          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#7C5CFC]" />
        </button>

        {/* Profile */}
        <button className="w-9 h-9 rounded-xl bg-[#F0EBFF] text-[#7C5CFC] font-bold text-sm">
          S
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
    <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#EDE7FF] via-[#DDD4FF] to-[#D8F3E5] p-7">

      {/* Decorative circles */}
      <div className="absolute -right-5 -top-10 w-32 h-32 rounded-full bg-white/30" />

      <div className="absolute right-24 -bottom-16 w-28 h-28 rounded-full bg-[#A78BFA]/20" />

      <div className="relative max-w-[600px]">

        <div className="inline-flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full text-[10px] font-semibold text-[#6545E8]">
          <Sparkles size={12} />
          Your progress matters
        </div>

        <h1 className="text-3xl font-bold text-[#302A3D] mt-4">
          Your speech journey{" "}
          <span className="text-[#7C5CFC]">
            continues!
          </span>
        </h1>

        <p className="text-sm text-[#655D70] mt-3 max-w-[500px]">
          Practice a little every day, build confidence, and make
          your communication stronger.
        </p>

        <button
          className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl
          bg-[#7C5CFC] text-white text-xs font-semibold
          hover:bg-[#6545E8] transition"
        >
          <Play size={14} fill="white" />
          Start Practice
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
    <div className="bg-white border border-[#EAE5F2] rounded-2xl p-5">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-[10px] font-semibold text-[#81788F]">
            CONTINUE PRACTICE
          </p>

          <h2 className="text-base font-bold text-[#302A3D] mt-1">
            Articulation Practice
          </h2>
        </div>

        <div className="w-9 h-9 rounded-xl bg-[#F0EBFF] flex items-center justify-center">
          <Volume2 size={17} className="text-[#7C5CFC]" />
        </div>
      </div>

      {/* Exercise */}
      <div className="mt-5 bg-[#F8F6FF] rounded-xl p-4">

        <div className="flex justify-between">

          <div>
            <p className="text-xs font-semibold text-[#302A3D]">
              /R/ Sound
            </p>

            <p className="text-[10px] text-[#81788F] mt-1">
              Level 4 • Intermediate
            </p>
          </div>

          <p className="text-xs font-bold text-[#7C5CFC]">
            70%
          </p>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-[#E8E3F4] rounded-full mt-3">
          <div
            className="h-full bg-[#7C5CFC] rounded-full"
            style={{ width: "70%" }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-[10px] text-[#81788F]">
            7 of 10 exercises
          </p>

          <p className="text-[10px] text-[#81788F]">
            3 remaining
          </p>
        </div>
      </div>

      <button className="w-full mt-4 py-3 rounded-xl bg-[#7C5CFC] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#6545E8]">
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

        <div>
          <p className="text-[10px] font-semibold text-[#81788F]">
            PRACTICE AREAS
          </p>

          <h2 className="text-base font-bold text-[#302A3D] mt-1">
            Your Skills
          </h2>
        </div>

        <button className="text-[10px] text-[#7C5CFC] font-semibold">
          View all
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">

        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <button
              key={skill.name}
              className="bg-white border border-[#EAE5F2] rounded-2xl p-4 text-left hover:shadow-sm transition"
            >

              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: skill.bg }}
              >
                <Icon size={17} style={{ color: skill.color }} />
              </div>

              <h3 className="text-xs font-bold text-[#302A3D] mt-4">
                {skill.name}
              </h3>

              <p className="text-[10px] text-[#81788F] mt-1">
                {skill.description}
              </p>

              <div className="flex justify-between items-center mt-4">

                <span className="text-[9px] text-[#81788F]">
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

        <div>
          <p className="text-[10px] font-semibold text-[#81788F]">
            KEEP GOING
          </p>

          <h2 className="text-base font-bold text-[#302A3D] mt-1">
            Recent Exercises
          </h2>
        </div>

        <button className="text-[10px] text-[#7C5CFC] font-semibold">
          See all
        </button>
      </div>

      <div className="space-y-3">

        {recentExercises.map((exercise) => {
          const Icon = exercise.icon;

          return (
            <div
              key={exercise.name}
              className="bg-white border border-[#EAE5F2] rounded-2xl p-4 flex items-center gap-3"
            >

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: exercise.bg }}
              >
                <Icon
                  size={17}
                  style={{ color: exercise.color }}
                />
              </div>

              {/* Details */}
              <div className="flex-1">

                <div className="flex justify-between">

                  <div>
                    <p className="text-xs font-bold text-[#302A3D]">
                      {exercise.name}
                    </p>

                    <p className="text-[10px] text-[#81788F] mt-0.5">
                      {exercise.subtitle}
                    </p>
                  </div>

                  {exercise.progress === 100 && (
                    <CheckCircle2
                      size={17}
                      className="text-[#65C18C]"
                    />
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">

                  <div className="flex-1 h-1.5 bg-[#ECE8F3] rounded-full">
                    <div
                      className="h-full bg-[#7C5CFC] rounded-full"
                      style={{
                        width: `${exercise.progress}%`,
                      }}
                    />
                  </div>

                  <span className="text-[9px] text-[#81788F] flex items-center gap-1">
                    <Clock size={10} />
                    {exercise.duration}
                  </span>
                </div>
              </div>

              {/* Play */}
              <button className="hidden sm:flex w-8 h-8 rounded-lg bg-[#F0EBFF] items-center justify-center">
                <Play
                  size={13}
                  fill="#7C5CFC"
                  className="text-[#7C5CFC]"
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
  return (
    <div className="bg-white border border-[#EAE5F2] rounded-2xl p-5">

      <div className="flex justify-between">

        <div>
          <p className="text-[10px] font-semibold text-[#81788F]">
            DAILY GOAL
          </p>

          <h2 className="text-base font-bold text-[#302A3D] mt-1">
            Keep your streak
          </h2>
        </div>

        <Target
          size={17}
          className="text-[#7C5CFC]"
        />
      </div>

      {/* Circle */}
      <div className="flex justify-center mt-6">

        <div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          style={{
            background:
              "conic-gradient(#7C5CFC 0deg 270deg, #E9E4F3 270deg)",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center">

            <p className="text-xl font-bold text-[#302A3D]">
              15
            </p>

            <p className="text-[10px] text-[#81788F]">
              / 20 min
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">

        <p className="text-xs font-semibold text-[#302A3D]">
          5 minutes to go!
        </p>

        <p className="text-[10px] text-[#81788F] mt-1">
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
    <div className="bg-white border border-[#EAE5F2] rounded-2xl p-5">

      <div className="flex justify-between">

        <div>
          <p className="text-[10px] font-semibold text-[#81788F]">
            OVERALL PROGRESS
          </p>

          <h2 className="text-base font-bold text-[#302A3D] mt-1">
            Speech Progress
          </h2>
        </div>

        <BarChart3
          size={17}
          className="text-[#65C18C]"
        />
      </div>

      <div className="flex justify-between items-end mt-5">

        <div>
          <p className="text-2xl font-bold text-[#4EAD78]">
            78%
          </p>

          <p className="text-[10px] text-[#81788F]">
            Overall improvement
          </p>
        </div>

        <span className="text-[9px] font-semibold text-[#429E6B] bg-[#E4F6EC] px-2 py-1 rounded-full">
          +8% this month
        </span>
      </div>

      <ProgressBar
        name="Articulation"
        value={82}
        color="#7C5CFC"
      />

      <ProgressBar
        name="Pronunciation"
        value={76}
        color="#65C18C"
      />

      <ProgressBar
        name="Fluency"
        value={68}
        color="#F6C85F"
      />
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

        <span className="text-[10px] text-[#655D70]">
          {name}
        </span>

        <span className="text-[10px] font-semibold text-[#302A3D]">
          {value}%
        </span>
      </div>

      <div className="h-1.5 bg-[#ECE8F3] rounded-full">

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
    <div className="bg-[#F2EEFF] rounded-2xl p-5">

      <div className="flex justify-between">

        <div>
          <p className="text-[10px] font-semibold text-[#81788F]">
            YOUR THERAPIST
          </p>

          <h2 className="text-base font-bold text-[#302A3D] mt-1">
            Dr. Ananya
          </h2>
        </div>

        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          👩‍⚕️
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-[10px] text-[#655D70]">
        <CheckCircle2
          size={14}
          className="text-[#65C18C]"
        />
        Feedback available
      </div>

      <button className="w-full bg-white rounded-xl py-2.5 mt-4 text-[10px] font-semibold text-[#7C5CFC]">
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
    <div className="bg-[#FFF4D6] rounded-2xl p-5">

      <div className="flex justify-between">

        <div>
          <p className="text-[10px] font-semibold text-[#9B7A24]">
            LATEST REWARD
          </p>

          <h2 className="text-base font-bold text-[#5E4B1D] mt-1">
            Practice Star
          </h2>
        </div>

        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
          <Trophy
            size={18}
            className="text-[#D39E24]"
          />
        </div>
      </div>

      <p className="text-[10px] text-[#806D38] mt-3 leading-4">
        Complete 3 more exercises to unlock your next achievement.
      </p>

      <div className="h-1.5 bg-white/70 rounded-full mt-4">
        <div className="w-[65%] h-full bg-[#F6C85F] rounded-full" />
      </div>
    </div>
  );
}


// ============================================================
// NEXT SESSION
// ============================================================

function NextSession() {
  return (
    <div className="bg-white border border-[#EAE5F2] rounded-2xl p-5">

      <div className="flex justify-between">

        <div>
          <p className="text-[10px] font-semibold text-[#81788F]">
            NEXT SESSION
          </p>

          <h2 className="text-base font-bold text-[#302A3D] mt-1">
            Therapist Session
          </h2>
        </div>

        <Calendar
          size={17}
          className="text-[#7C5CFC]"
        />
      </div>

      <div className="bg-[#F8F6FF] rounded-xl p-3 mt-4 flex items-center gap-3">

        <div className="w-9 h-9 bg-[#EEE9FF] rounded-lg flex items-center justify-center">
          <Calendar
            size={16}
            className="text-[#7C5CFC]"
          />
        </div>

        <div>
          <p className="text-xs font-bold text-[#302A3D]">
            Tomorrow
          </p>

          <p className="text-[10px] text-[#81788F] mt-1">
            4:00 PM • 30 minutes
          </p>
        </div>
      </div>

      <button className="w-full border border-[#E5DEF5] rounded-xl py-2.5 mt-3 text-[10px] font-semibold text-[#7C5CFC]">
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE5F2] z-50">

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
          className="w-12 h-12 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center -mt-6 shadow-lg"
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
        active ? "text-[#7C5CFC]" : "text-[#81788F]"
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

        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F0EBFF] flex items-center justify-center">
          {name === "Exercises" && (
            <Dumbbell className="text-[#7C5CFC]" />
          )}

          {name === "Progress" && (
            <BarChart3 className="text-[#7C5CFC]" />
          )}

          {name === "Profile" && (
            <User className="text-[#7C5CFC]" />
          )}

          {name === "Settings" && (
            <Settings className="text-[#7C5CFC]" />
          )}
        </div>

        <h1 className="text-xl font-bold text-[#302A3D] mt-4">
          {name}
        </h1>

        <p className="text-sm text-[#81788F] mt-2">
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
    <div className="min-h-screen bg-[#F8F7FC]">

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