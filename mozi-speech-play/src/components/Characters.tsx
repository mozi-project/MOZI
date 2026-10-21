import React from 'react';

interface MoziBunnyProps {
  className?: string;
  equippedHat?: string;
}

export const MoziBunny: React.FC<MoziBunnyProps> = ({ className = 'w-48 sm:w-56 h-48 sm:h-56', equippedHat = 'none' }) => {
  return (
    <div className={`relative z-10 ${className}`}>
      <svg className="w-full h-full select-none" fill="none" viewBox="0 0 220 220">
        {/* Bunny Ears */}
        <path d="M65 85 C40 15 78 5 90 70 Z" fill="#FFDF9D" stroke="#1F2A44" strokeWidth="2.5" />
        <path d="M70 75 C52 25 74 15 84 65 Z" fill="#FF5D35" opacity="0.35" />
        <path d="M155 85 C180 15 142 5 130 70 Z" fill="#FFDF9D" stroke="#1F2A44" strokeWidth="2.5" />
        <path d="M150 75 C168 25 146 15 136 65 Z" fill="#FF5D35" opacity="0.35" />

        {/* Bunny Round Chubby Body & Head */}
        <circle cx="110" cy="130" fill="#FFDF9D" r="70" stroke="#1F2A44" strokeWidth="2.5" />

        {/* Soft Belly Patch */}
        <ellipse cx="110" cy="150" fill="#FAF8FF" rx="42" ry="32" />

        {/* Blush Cheeks */}
        <circle cx="72" cy="136" fill="#FF5D35" opacity="0.45" r="12" />
        <circle cx="148" cy="136" fill="#FF5D35" opacity="0.45" r="12" />

        {/* Big Joyful Eyes */}
        <ellipse cx="86" cy="118" fill="#0F1B34" rx="8" ry="11" />
        <circle cx="83" cy="114" fill="#FFFFFF" r="3.5" />
        <circle cx="89" cy="122" fill="#FFFFFF" r="1.5" />
        <ellipse cx="134" cy="118" fill="#0F1B34" rx="8" ry="11" />
        <circle cx="131" cy="114" fill="#FFFFFF" r="3.5" />
        <circle cx="137" cy="122" fill="#FFFFFF" r="1.5" />

        {/* Button Nose */}
        <ellipse cx="110" cy="127" fill="#B42801" rx="5.5" ry="4.5" />

        {/* Happy Smile */}
        <path d="M100 134 C105 140 110 138 110 133 C110 138 115 140 120 134" fill="none" stroke="#0F1B34" strokeLinecap="round" strokeWidth="4" />

        {/* Chubby Bunny Paws */}
        <ellipse cx="64" cy="165" fill="#FFDF9D" rx="14" ry="10" stroke="#1F2A44" strokeWidth="2" />
        <ellipse cx="156" cy="165" fill="#FFDF9D" rx="14" ry="10" stroke="#1F2A44" strokeWidth="2" />
        {/* Paw details */}
        <circle cx="62" cy="165" fill="#B42801" opacity="0.25" r="2.5" />
        <circle cx="158" cy="165" fill="#B42801" opacity="0.25" r="2.5" />

        {/* Wearable Hat Accessories */}
        {equippedHat === 'crown' && (
          <g transform="translate(80, 52)">
            <polygon points="0,24 5,4 15,14 30,0 45,14 55,4 60,24" fill="#FFC531" stroke="#1F2A44" strokeWidth="2.5" />
            <circle cx="15" cy="12" fill="#FF5D35" r="2.5" />
            <circle cx="30" cy="8" fill="#13A4A0" r="3" />
            <circle cx="45" cy="12" fill="#FF5D35" r="2.5" />
          </g>
        )}

        {equippedHat === 'detective' && (
          <g transform="translate(68, 48)">
            <ellipse cx="42" cy="24" rx="46" ry="10" fill="#785900" stroke="#1F2A44" strokeWidth="2.5" />
            <path d="M16 22 C16 6 68 6 68 22 Z" fill="#BA8C00" stroke="#1F2A44" strokeWidth="2.5" />
            <rect x="36" y="10" width="12" height="12" rx="2" fill="#FFDF9D" stroke="#1F2A44" strokeWidth="1.5" />
          </g>
        )}

        {equippedHat === 'party' && (
          <g transform="translate(90, 24)">
            <polygon points="20,0 0,44 40,44" fill="#FF5D35" stroke="#1F2A44" strokeWidth="2.5" />
            <circle cx="20" cy="0" fill="#FFC531" r="5" stroke="#1F2A44" strokeWidth="1.5" />
            <path d="M6 34 Q20 38 34 34" stroke="#FFF4DC" strokeWidth="3" fill="none" />
            <path d="M10 20 Q20 24 30 20" stroke="#13A4A0" strokeWidth="3" fill="none" />
          </g>
        )}

        {equippedHat === 'pirate' && (
          <g transform="translate(70, 44)">
            <path d="M6 26 C12 6 68 6 74 26 C58 20 22 20 6 26 Z" fill="#1F2A44" stroke="#1F2A44" strokeWidth="2.5" />
            <circle cx="40" cy="18" fill="#FFF4DC" r="4" />
          </g>
        )}

        {equippedHat === 'space' && (
          <g transform="translate(64, 46)">
            <circle cx="46" cy="38" r="42" fill="#7FF5F0" fillOpacity="0.35" stroke="#006A67" strokeWidth="3" />
            <ellipse cx="46" cy="38" rx="36" ry="24" fill="#60D9D4" fillOpacity="0.2" />
          </g>
        )}
      </svg>
    </div>
  );
};

export const SasaSnake: React.FC<{ className?: string }> = ({ className = 'w-24 sm:w-28 h-36 sm:h-44' }) => {
  return (
    <div className={`relative z-10 flex items-end ${className}`}>
      <svg className="w-full h-full select-none" fill="none" viewBox="0 0 120 180">
        {/* Snake body coils */}
        <path
          d="M40 160 C10 160 10 125 40 125 C80 125 80 90 45 90 C25 90 20 60 45 55 C70 50 85 20 50 20"
          stroke="#006A67"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="26"
        />
        <path
          d="M40 160 C10 160 10 125 40 125 C80 125 80 90 45 90 C25 90 20 60 45 55 C70 50 85 20 50 20"
          stroke="#7FF5F0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="18"
        />
        {/* Sasa Spots */}
        <circle cx="48" cy="120" fill="#006A67" r="5" />
        <circle cx="36" cy="75" fill="#006A67" r="4.5" />

        {/* Sasa Head */}
        <ellipse cx="56" cy="22" fill="#7FF5F0" rx="22" ry="18" stroke="#006A67" strokeWidth="2.5" />

        {/* Big Smile */}
        <path d="M48 24 Q56 32 66 23" fill="none" stroke="#0F1B34" strokeLinecap="round" strokeWidth="3.5" />

        {/* Cheeks */}
        <ellipse cx="44" cy="24" fill="#FF5D35" rx="4" ry="2.5" />
        <ellipse cx="68" cy="24" fill="#FF5D35" rx="4" ry="2.5" />

        {/* Big Friendly Eyes */}
        <ellipse cx="48" cy="14" fill="#0F1B34" rx="5" ry="6" />
        <circle cx="46" cy="12" fill="#FFFFFF" r="2" />
        <ellipse cx="62" cy="14" fill="#0F1B34" rx="5" ry="6" />
        <circle cx="60" cy="12" fill="#FFFFFF" r="2" />

        {/* Cute Snake Tongue */}
        <path d="M66 27 L76 29 M76 29 L82 25 M76 29 L81 33" stroke="#B42801" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    </div>
  );
};
