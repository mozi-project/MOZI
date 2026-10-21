import React, { useState } from 'react';
import { NavigationPath, Role } from '../types/index.ts';

interface NavbarProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  role: Role;
  onRoleChange: (role: Role) => void;
  tokenCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  role,
  onRoleChange,
  tokenCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { path: NavigationPath; label: string; icon: string }[] = [
    { path: 'child-home', label: 'Child Home', icon: 'cottage' },
    { path: 'games', label: 'Games', icon: 'sports_esports' },
    { path: 'playing-stage', label: 'Playing Stage', icon: 'play_circle' },
    { path: 'rewards', label: 'Rewards', icon: 'military_tech' },
    { path: 'practice-sheets', label: 'Practice Sheets', icon: 'menu_book' },
    { path: 'therapist-desk', label: 'Therapist Desk', icon: 'clinical_notes' },
    { path: 'admin-control', label: 'Admin Control', icon: 'admin_panel_settings' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF4DC] border-b-[1.5px] border-[#1F2A44]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('child-home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-[4px] bg-[#13A4A0] border-[1.5px] border-[#1F2A44] flex items-center justify-center shadow-none transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[#1F2A44] text-[28px]">cruelty_free</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-[#0F1B34] leading-none tracking-tight">Mozi</span>
            <span className="font-label-md text-label-md text-[#006A67] font-bold leading-tight">Speech Play</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`px-3 py-1.5 rounded-[4px] font-label-md text-[15px] border-[1.5px] border-[#1F2A44] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#006A67] text-[#FFFFFF] font-extrabold shadow-none'
                    : 'bg-[#FFF4DC] text-[#0F1B34] hover:bg-[#E1E7FF] hover:text-[#0F1B34]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Tokens, Role Dropdown & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tokens Pill */}
          <div 
            onClick={() => onNavigate('rewards')}
            className="hidden md:flex items-center gap-1.5 bg-[#FFDF9D] px-2.5 py-1 rounded-[4px] border-[1.5px] border-[#1F2A44] cursor-pointer hover:bg-[#F7BE29] transition-colors"
            title="Voice Tokens"
          >
            <span className="material-symbols-outlined text-[#785900] text-[18px]">monetization_on</span>
            <span className="font-label-md text-xs font-black text-[#251A00]">{tokenCount}</span>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center bg-[#D9E2FF] px-2.5 py-1 rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none">
            <span className="font-label-md text-xs text-[#0F1B34] mr-1.5 hidden sm:inline font-bold">Role:</span>
            <select
              value={role}
              onChange={(e) => onRoleChange(e.target.value as Role)}
              className="bg-transparent font-label-md text-xs sm:text-sm text-[#006A67] font-extrabold focus:outline-none cursor-pointer"
            >
              <option value="child">Little Explorer</option>
              <option value="therapist">SLP Therapist</option>
              <option value="admin">Clinic Admin</option>
            </select>
          </div>

          {/* User Icon Avatar */}
          <div 
            onClick={() => onNavigate(role === 'therapist' ? 'therapist-desk' : role === 'admin' ? 'admin-control' : 'child-home')}
            className="w-8 h-8 rounded-[4px] bg-[#006A67] flex items-center justify-center border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer"
            title={`Active: ${role === 'child' ? 'Aarav Sharma (Kid)' : role === 'therapist' ? 'Dr. Elena Vance, SLP' : 'Admin Portal'}`}
          >
            <span className="material-symbols-outlined text-[#FFFFFF] text-[18px]">person</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FFF4DC] text-[#1F2A44]"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFF4DC] border-t-[1.5px] border-[#1F2A44] px-4 py-3 space-y-1.5 shadow-md">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[4px] font-label-md text-sm border-[1.5px] border-[#1F2A44] ${
                  isActive
                    ? 'bg-[#006A67] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] text-[#0F1B34]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
